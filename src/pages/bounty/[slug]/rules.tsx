import Head from 'next/head';
import { useRouter } from 'next/router';

import { GoToNewSubmissionPage } from '@/lib/utils/Routes';

import AppLayout from '@/components/layouts/AppLayout';
import RulesContent from '@/components/pages/rules/rulesContent';
import { ReadingSection } from '@/components/reading/utils';
import { Button, ButtonStyle } from '@/components/utils/Button';
import FromBounty from '@/components/utils/FromBounty';

import { NextPageWithLayout } from '@/pages/_app';

const BeforeNewSubmission: NextPageWithLayout = () => {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <>
      <Head>
        <title>ST | Before Submitting</title>
        <meta
          name="description"
          content=" An open source project dedicated to crowdsourcing and crowdfunding
          OSINT for locating the cryptowallets of threat actors."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="space-y-6 p-4">
        <ReadingSection
          title="Read before continuing"
          className="rounded-xl bg-surface px-8 py-6"
        >
          <RulesContent />
        </ReadingSection>

        <ReadingSection className="px-8 pt-4" spacing="space-y-6">
          <div className="mx-auto max-w-4xl space-y-6">
            <FromBounty slug={slug as string} title="You are submitting to" />
          </div>

          <div className="items-center gap-8 tablet:flex tablet:-translate-x-6">
            <Button
              info={{
                icon: 'arrow_back',
                label: "I don't agree, return to bounty",
                labelClasses: 'label-lg',
                style: ButtonStyle.Hollow,
                isALink: '#',
                className: 'w-full tablet:w-fit',
                onClick: () => router.back(),
              }}
            />
            <Button
              info={{
                icon: 'handshake',
                label: 'I agree, begin submission',
                labelClasses: 'label-lg',
                style: ButtonStyle.Filled,
                isALink: '#',
                className: 'w-full tablet:w-fit mt-3 tablet:mt-0',
                onClick: () =>
                  router.push(GoToNewSubmissionPage(slug as string)),
              }}
            />
          </div>
        </ReadingSection>
      </div>
    </>
  );
};

export default BeforeNewSubmission;
BeforeNewSubmission.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};
