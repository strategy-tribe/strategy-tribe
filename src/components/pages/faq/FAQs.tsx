import Link from 'next/link';

import { GoToAccountPage, GoToRulesPage } from '@/lib/utils/Routes';

import { FAQuestion } from '@/components/pages/faq/FAQuestion';
import { ReadingSection } from '@/components/reading/utils';

export function FAQs({
  submissionsPerDay,
  discordUrl,
}: {
  submissionsPerDay: number;
  discordUrl: string;
}) {
  return (
    <ReadingSection title="FAQ">
      <div className="space-y-8">
        <FAQuestion
          question="What information do you collect and store?"
          answer="At StrategyTribe, we are committed to transparency and our users' privacy. We believe in giving our users control over their data and keeping it safe and secure. We only collect four data points: username, wallet addresses used for donating or receiving funds and any information you submit to us, such as bounty submissions or an optional leaderboard username. We do not collect any other personal information and take steps to protect the data we collect."
        />
        <FAQuestion
          question="Can anyone submit information?"
          answer={
            <p>
              Encouraging public participation is crucial to attaining our
              objectives. We welcome submissions from all interested parties,
              and we encourage you to do so as well. For your convenience, we
              have compiled a comprehensive set of guidelines, which can be
              accessed under{' '}
              <Link href={GoToRulesPage()}>
                <span className="text-main-light underline hover:text-main">
                  Rules
                </span>
              </Link>
              .
            </p>
          }
        />
        <FAQuestion
          question="How do the payments work?"
          height="h-20"
          answer={
            <p>
              Upon successful verification and acceptance of your submission and
              the bounty closing, the funds from the bounty will be disbursed to
              your registered wallet. We recommend reviewing your registered
              wallet address to ensure the funds are sent to the correct
              location. You can review your wallet address under{' '}
              <Link href={GoToAccountPage()}>
                <span className="text-main-light underline hover:text-main">
                  Account
                </span>
              </Link>
              .
            </p>
          }
        />
        <FAQuestion
          question="How many times I can submit my findings?"
          answer={`There are no restrictions on the number of bounties you may submit to. However, we do impose
              a maximum submission limit of ${submissionsPerDay} per bounty per day.`}
        />

        <FAQuestion
          question="What is the reason behind my submission being declined without feedback?"
          answer="The majority of bounties accept only one submission. Once a submission is approved and the bounty is closed, all remaining submissions are rejected automatically. Additionally, when multiple valid submissions are made for the same bounty, we prioritize the submission that provides a more comprehensive dataset and a superior explanation of the data acquisition process."
        />

        <FAQuestion
          question="Why donate financially to a bounty?"
          answer={
            <p>
              By increasing the bounty’s monetary value, you are incentivizing
              more users to work on solving it. Furthermore, some users might
              not have the needed skill level to solve a bounty but desire to
              contribute financially to encourage others to solve it.
              <br />
              <br /> Consider supporting bounties aimed at targets you believe
              will serve the public interest. Your contribution will be added to
              the overall bounty amount and its potential success. Rest assured,
              the identities of donors will remain confidential.
            </p>
          }
        />

        <FAQuestion
          question="What is the procedure for donating to a bounty?"
          answer="To donate, click on the “Support this bounty” button on the bounty’s page. Enter the desired donation amount and proceed with the transaction using your wallet connected to StrategyTribe. Your contribution will be added to the bounty’s value within a few days."
        />

        <FAQuestion
          question="What is the maximum payout?"
          answer="We do not impose any limits on the payout amounts. We strongly encourage you to actively
              participate in our efforts to bring criminals to justice and assist us in achieving our mission."
        />

        <FAQuestion
          question="Is it possible to create, fund, and obtain the details of a bounty on StrategyTribe?"
          answer={
            <p>
              Users can submit bounty requests through{' '}
              <a
                className="underline hover:text-main-light"
                href={discordUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Discord
              </a>{' '}
              , which our team will evaluate. We can share the details of
              accepted submissions with the requester on a case-by-case basis.
              If the proposal aligns with our bounty guidelines, we will
              initiate the bounty, after which users can financially support it
              using the donate option. Please read the rules for submitting a
              bounty.
              <br />
              <br /> <strong> Note:</strong> The StrategyTribe team reserves the
              right to accept or reject any bounty requests or submissions at
              our discretion.
            </p>
          }
        />
      </div>
    </ReadingSection>
  );
}
