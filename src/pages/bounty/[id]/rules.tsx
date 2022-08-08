import Head from 'next/head';
import { useRouter } from 'next/router';

import AppLayout from '@/components/layouts/AppLayout';
import { ReadingSection, SectionContent } from '@/components/reading/utils';
import { Button, ButtonStyle } from '@/components/utils/Button';
import FromBounty from '@/components/utils/FromBounty';
import Icon, { IconSize } from '@/components/utils/Icon';

import { NextPageWithLayout } from '@/pages/_app';
import { GoToNewSubmissionPage } from '@/utils/Routes';

const BeforeNewSubmission: NextPageWithLayout = () => {
  const router = useRouter();
  const { id } = router.query;

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
      <div className="space-y-6">
        <ReadingSection
          title="Read before continuing"
          className="bg-surface px-8 py-6 rounded-xl"
        >
          <SectionContent
            content={`When submitting your findings, you agree to our terms of service.
                      \n  All the information in the findings you submit must be valid and
                      correct. To successfully submit your findings, you must fill in
                      all the required fields.
                      \n Bounties have required and optional fields. These fields vary
                      depending on the bounty, but the chances of your findings being
                      approved increase the more evidence you provide in your
                      submission.
                      \n The judging criteria for bounties are the same regardless of the
                      type of bounty you have chosen to pursue. When reflecting on
                      whether your submission meets the minimum standard required to be
                      accepted:`}
          />

          <ul className="py-2 space-y-4 max-w-xl">
            <ol className="flex flex-col gap-1">
              <div className="label-lg text-error-light flex items-center gap-2">
                <Icon icon="report" size={IconSize.Small} />
                Are you submitting enough information?
              </div>
              You should submit at least one piece of information that matches
              the bounty description. For example, at least one email or wallet
              address.
            </ol>

            <ol className="flex flex-col gap-1 max-w-xl">
              <div className="label-lg text-error-light flex items-center gap-2">
                <Icon icon="report" size={IconSize.Small} />
                <span>Can the staff replicate your process?</span>
              </div>
              <span>
                The connection between the bounty and your submission must be
                solid and clear.
                <br />
                In order to ensure your information is trustworthy, our staff
                must be able to reach the same conclusion following the same
                steps as you. You can submit screenshots of your process as
                attachments or a step-by-step guide.
              </span>
            </ol>
          </ul>

          <SectionContent
            content={` The staff will judge your submission based on the evidence you
                      have provided.
                      \n StrategyTribe does not guarantee all submissions will be reviewed.
                      Bounties and their rewards are awarded on a “first come, first
                      served” basis; someone might have submitted their findings before
                      you.`}
          />
        </ReadingSection>

        <ReadingSection className="px-8 pt-4" spacing="space-y-6">
          <div className="mx-auto max-w-4xl space-y-6">
            <FromBounty bountyId={id as string} title="You are submitting to" />
          </div>

          <div className="flex gap-8 items-center -translate-x-6">
            <Button
              info={{
                icon: 'arrow_back',
                label: "I don't agree, return to bounty",
                labelClasses: 'label-lg',
                style: ButtonStyle.Hollow,
                isALink: '#',
                className: 'w-fit',
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
                className: 'w-fit',
                onClick: () => router.push(GoToNewSubmissionPage(id as string)),
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
