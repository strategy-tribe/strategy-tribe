('@/components/utils/Title');
import { RequirementType } from '@prisma/client';
import Head from 'next/head';
import { useMemo, useState } from 'react';

import AppLayout from '@/components/layouts/AppLayout';
import { EditBounty } from '@/components/pages/admin/bounty/EditBounty';
import { Button, ButtonStyle } from '@/components/utils/Button';
import Dropdown, { HasLabel } from '@/components/utils/Dropdown';
import { Title } from '@/components/utils/Title';

import { GetFullBountyParams } from '@/server/routes/bounties/getFullBounty';

import { NextPageWithLayout } from '../../_app';

const EditBountiesPage: NextPageWithLayout = () => {
  const [filter, setFilter] = useState<GetFullBountyParams>({
    slugs: undefined,
    targetNames: undefined,
    types: undefined,
    search: undefined,
  });
  const [submited, setSubmitted] = useState(false);

  const cancel = () => {
    setSubmitted(false);
    setFilter({
      slugs: undefined,
      targetNames: undefined,
      types: undefined,
      search: undefined,
    });
  };

  const disabled = useMemo(() => {
    setSubmitted(false);
    if (
      (filter.search && filter.search.length > 26) ||
      (filter.slugs && filter.slugs[0].length === 25) ||
      (filter.targetNames && filter.types)
    ) {
      return false;
    }
    return true;
  }, [filter]);

  const options = useMemo(() => {
    return ['Email', 'Wallet', 'Domain'].map((entry) => {
      return { label: entry } as HasLabel;
    });
  }, []);

  return (
    <div className="space-y-8 text-on-surface-p1">
      <Head>
        <title>Edit Bounties</title>
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
        <div className="space-y-4 border-b-2 border-surface pb-2">
          <Title title="Edit Bounties" useBorder={true} big={true} />
          <div className="flex w-full items-baseline justify-between  border-surface pb-4">
            <div className="grid w-full px-2">
              <label title="Target Details" className="font-bold">
                Bounty title:
              </label>
              <input
                type="text"
                placeholder="Search"
                value={filter.search}
                onChange={(e) =>
                  setFilter({
                    ...filter,
                    slugs: undefined,
                    targetNames: undefined,
                    types: undefined,
                    search: e.target.value,
                  })
                }
                className="mt-2 rounded-md bg-bg text-on-surface-p0 placeholder:text-on-surface-unactive focus:border-main-light" //{`${colors} ${borders} ${font} w-full`}
              />
              <p>{filter.search}</p>
            </div>
            <div className="grid w-full px-2">
              <label title="Target Details" className="font-bold">
                Slug:
              </label>
              <input
                type="text"
                placeholder="Search"
                value={filter.slugs ? filter.slugs[0] : undefined}
                onChange={(e) =>
                  setFilter({
                    slugs: [e.target.value],
                    targetNames: undefined,
                    types: undefined,
                    search: undefined,
                  })
                }
                className="mt-2 rounded-md bg-bg text-on-surface-p0 placeholder:text-on-surface-unactive focus:border-main-light" //{`${colors} ${borders} ${font} w-full`}
              />
              <p>{filter.slugs ? filter.slugs[0] : ''}</p>
            </div>
            <div className="w-full">
              <div className="grid w-full px-2">
                <label title="Target Details" className="font-bold">
                  Target/Org:
                </label>
                <input
                  type="text"
                  placeholder="Search"
                  value={filter.targetNames ? filter.targetNames[0] : undefined}
                  onChange={(e) =>
                    setFilter({
                      slugs: undefined,
                      targetNames: [e.target.value],
                      types: filter.types,
                      search: undefined,
                    })
                  }
                  className="mt-2 rounded-md bg-bg text-on-surface-p0 placeholder:text-on-surface-unactive focus:border-main-light" //{`${colors} ${borders} ${font} w-full`}
                />
                <p>{filter.targetNames ? filter.targetNames[0] : ''}</p>
              </div>
              {filter.targetNames && (
                <div className="mt-4 grid w-full px-2">
                  <label title="Target Details" className="mb-2 font-bold">
                    Bounty Type
                    <span className="text-error">*</span> :
                  </label>
                  <Dropdown
                    defaultOptionIndex={0}
                    labelClass="border-2 p-2 focus:border-main rounded-md border-surface"
                    options={options}
                    onSelect={({ label: newState }) =>
                      setFilter({
                        slugs: undefined,
                        targetNames: filter.targetNames,
                        types: [newState as RequirementType],
                        search: undefined,
                      })
                    }
                  />
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-between">
            <Button
              info={{
                style: ButtonStyle.Filled,
                onClick: () => {
                  setSubmitted(true);
                },
                disabled: disabled,
                label: 'Get Bounty',
              }}
            />
            {submited && (
              <Button
                info={{
                  style: ButtonStyle.Hollow,
                  onClick: cancel,
                  label: 'Cancel',
                }}
              />
            )}
          </div>
        </div>

        {submited && <EditBounty config={filter} cancel={cancel} />}
      </div>
    </div>
  );
};

export default EditBountiesPage;
EditBountiesPage.getLayout = function getLayout(page) {
  return (
    <>
      <AppLayout>{page}</AppLayout>
    </>
  );
};
