import Head from 'next/head';
import { useRouter } from 'next/router';

import AppLayout from '@/components/layouts/AppLayout';
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
        <div className="mx-auto max-w-5xl">
          <FromBounty bountyId={id as string} title="You are submitting to" />
        </div>

        <div className="bg-surface-dark rounded space-y-7 px-8 py-6 mx-auto max-w-5xl">
          <header className="space-y-1">
            <h1 className="h4">Rules for Submitting</h1>

            <div className="flex items-center gap-1 text-error-light">
              <Icon icon="report" size={IconSize.Default} />
              <span className="label-lg">
                You need to read the rules before submitting your findings
              </span>
            </div>
          </header>

          <div className="max-w-2xl">
            <p>
              When submitting your findings, you agree to our terms of service.
            </p>
            <br />
            <p>
              All the information in the findings you submit must be valid and
              correct. To successfully submit your findings, you must fill in
              all the required fields.
            </p>
            <br />
            <p>
              Bounties have required and optional fields. These fields vary
              depending on the bounty, but the chances of your findings being
              approved increase the more evidence you provide in your
              submission.
            </p>
            <br />
            <p>
              The judging criteria for bounties are the same regardless of the
              type of bounty you have chosen to pursue. When reflecting on
              whether your submission meets the minimum standard required to be
              accepted:
            </p>
            <br />
            <ul className="pl-4 space-y-4">
              <ol className="flex flex-col gap-1">
                <div className="label-lg text-error-light flex items-center gap-2">
                  <Icon icon="report" size={IconSize.Small} />
                  Are you submitting enough information?
                </div>
                You should submit at least one piece of information that matches
                the bounty description. At least one email, for example.
              </ol>

              <ol className="flex flex-col gap-1">
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
            <br />
            <p>
              The staff will judge your submission based on the evidence you
              have provided.
            </p>
            <br />
            <p>
              StrategyTribe does not guarantee all submissions will be reviewed.
              Bounties and their rewards are awarded on a “first come, first
              served” basis; someone might have submitted their findings before
              you.
            </p>

            <br />
          </div>

          {/* <div className="space-y-8">
            <Button
              info={{
                label: 'Our Terms of Service',
                icon: 'arrow_forward',
                style: ButtonStyle.TextPurple,
                removePadding: true,
                isALink: '#',
                removeMinWidth: true,
                className: 'w-fit',
              }}
            /> 
            <Button
              info={{
                label: 'Judging Criteria',
                icon: 'arrow_forward',
                style: ButtonStyle.TextPurple,
                removePadding: true,
                isALink: GoToRulesPage(),
                removeMinWidth: true,
                className: 'w-fit',
              }}
            />
            <Button
              info={{
                label: 'Privacy Policy',
                icon: 'arrow_forward',
                style: ButtonStyle.TextPurple,
                removePadding: true,
                isALink: '#',
                removeMinWidth: true,
                className: 'w-fit',
              }}
            />
          </div> */}
        </div>

        <div className="mx-auto max-w-5xl flex gap-8 items-center px-8">
          <Button
            info={{
              icon: 'block',
              label: "I don't agree",
              style: ButtonStyle.Hollow,
              isALink: '#',
              className: 'w-fit',
              onClick: () => router.back(),
            }}
          />
          <Button
            info={{
              icon: 'handshake',
              label: 'I agree',
              style: ButtonStyle.Filled,
              isALink: '#',
              className: 'w-fit',
              onClick: () => router.push(GoToNewSubmissionPage(id as string)),
            }}
          />
        </div>
      </div>
    </>
  );
};

export default BeforeNewSubmission;
BeforeNewSubmission.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};
