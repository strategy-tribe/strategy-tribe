('@/components/utils/Title');
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ReactTextareaAutosize from 'react-textarea-autosize';

import { useAddBounties } from '@/lib/hooks/bountyHooks';

import AppLayout from '@/components/layouts/AppLayout';
import {
  DelayType,
  NotificationStyle,
  NotificationType,
} from '@/components/notifications/iNotification';
import { useNotification } from '@/components/notifications/NotificationContext';
import { Button, ButtonStyle } from '@/components/utils/Button';
import { Title } from '@/components/utils/Title';

import { NextPageWithLayout } from '../../_app';

const AddBountiesPage: NextPageWithLayout = () => {
  const [targets, setTargets] = useState(
    'name,organizationName,alsoKnownAs,tags,bio,types\n'
  );
  const [orgs, setOrgs] = useState(
    'name,alsoKnownAs,tags,countries,bio,why,links,types\n'
  );
  const [disabled, setDisabled] = useState(true);
  const { notify: notify } = useNotification();
  const router = useRouter();

  useEffect(() => {
    let disable = true;
    const t = targets.split('\n');
    const o = orgs.split('\n');
    if (
      (t.length > 1 && t[1].split(',').length > 5) ||
      (o.length > 1 && o[1].split(',').length > 7)
    ) {
      disable = false;
    }
    setDisabled(disable);
  }, [targets, orgs]);

  const { Add } = useAddBounties({
    onMutate: () => {
      notify(
        {
          title: 'Creating Bounties....',
          content: 'Please do not close this window',
          icon: 'warning',
        },
        {
          delayTime: 0,
          delayType: DelayType.Condition,
          condition: false,
          type: NotificationType.Banner,
        }
      );
    },
    onSuccess: (data) => {
      setOrgs(data.orgs);
      setTargets(data.targets);
      notify(
        {
          title:
            data.errors.length === 0
              ? 'Bounty Creation Successful'
              : data.errors.length < data.totalData
              ? 'Bounty creation failed partially'
              : 'Bounty Creation Failed',
          content:
            data.errors.length === 0
              ? undefined
              : () => (
                  <div>
                    <p>
                      {data.errors.length}/{data.totalData} Failed
                    </p>
                    <br />
                    {data.errors.map((e: string, i: number) => (
                      <p key={i}>{e}</p>
                    ))}
                  </div>
                ),
          style:
            data.errors.length === 0
              ? NotificationStyle.success
              : data.errors.length < data.totalData
              ? NotificationStyle.main
              : NotificationStyle.error,
        },
        {
          condition: false,
          delayTime: 5,
          delayType:
            data.errors.length === 0 ? DelayType.Time : DelayType.Condition,
          type: NotificationType.Banner,
        }
      );
    },
    onError: (error) => {
      notify(
        {
          title: 'There was an issue adding bounties',
          content: error,
          icon: 'warning',
          style: NotificationStyle.error,
        },
        {
          condition: false,
          delayTime: 5,
          delayType: DelayType.Time,
          type: NotificationType.Banner,
        }
      );
    },
  });

  return (
    <div className="space-y-8 text-on-surface-p1">
      <Head>
        <title>Add Bounties</title>
        <meta
          name="description"
          content="StrategyTribe was born from a need for higher quality, better scaled OSINT work on the
            world's most important threat actors. We aim to centralize, organize
            and incentivise the collection of widely important data by
            individuals."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="mx-auto min-h-screen max-w-5xl space-y-8 p-4">
        <div className="space-y-4">
          <Title title="Add New Bounties" useBorder={true} big={true} />
          <div className="mb-2 flex items-center justify-between border-b-2 border-surface pb-4">
            <Title title="Target Details" useBorder={true} big={true} />
            <ReactTextareaAutosize
              placeholder="Please enter targets data in csv format"
              className="body w-10/12 whitespace-pre-wrap rounded border border-dashed border-on-surface-disabled bg-bg p-4 font-inter text-on-surface-p1 first-letter:capitalize focus:border-on-surface-unactive focus:ring-0"
              onChange={(e) => setTargets(e.target.value)}
              value={targets}
              minRows={10}
            />
          </div>
          <div className="mb-2 flex items-center justify-between border-b-2 border-surface pb-4">
            <Title title="Organisation Details" useBorder={true} big={true} />
            <ReactTextareaAutosize
              placeholder="Please enter organisations data in csv format"
              className="body w-10/12 whitespace-pre-wrap rounded border border-dashed border-on-surface-disabled bg-bg p-4 font-inter text-on-surface-p1 first-letter:capitalize focus:border-on-surface-unactive focus:ring-0"
              onChange={(e) => setOrgs(e.target.value)}
              value={orgs}
              minRows={10}
            />
          </div>
          <Button
            info={{
              style: ButtonStyle.Filled,
              onClick: () => {
                const confirmed = window.confirm(
                  'Submit this data to create bounties?'
                );
                if (confirmed) Add({ targets, orgs });
              },
              disabled: disabled,
              label: 'Submit',
              className: 'h-fit',
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AddBountiesPage;
AddBountiesPage.getLayout = function getLayout(page) {
  return (
    <>
      <AppLayout>{page}</AppLayout>
    </>
  );
};
