import Head from 'next/head';

import AppLayout from '@/components/layouts/AppLayout';
import { AfterRead, ReadingSection } from '@/components/reading/utils';

import { NextPageWithLayout } from './_app';

const RulesPage: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>ST | Terms & Conditions</title>
        <meta
          name="description"
          content="An open source project dedicated to crowdsourcing and crowdfunding
          OSINT for locating the cryptowallets of threat actors."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="mx-auto max-w-4xl space-y-8">
        <h1 className="text-on-surface-p0">Terms & Conditions</h1>

        <ReadingSection>
          <p>
            Strategy Tribe is an open source project dedicated to crowdsourcing
            and crowdfunding OSINT locating the cryptowallets of threat actors.
            We reserve the right to sanction or expel any member or contributor
            at any time.
          </p>
          <p>
            The Strategy Tribe model is to crowdsource individuals who come
            together to work as a team or individually to help complete a
            worthwhile task. Bounties are contributed by members, sponsors and
            entities and paid out to individuals who identify information on
            ‘proposals’. Bounties are curated at the discretion of Strategy
            Tribe to only include entities, individuals or groups currently
            under sanction or to aid in the progress of public safety and good.
            Staff members review submissions based on the evidence provided
            alongside it. Once a submission is marked as accepted, the funds in
            the bounty’s wallet gets transferred to the user’s wallet..
          </p>
        </ReadingSection>
        <ReadingSection title="Focus & Mission">
          <p>
            Strategy tribe aims to support and encourage OSINT professionals
            achieving broad national security driven goals within the
            cryptocurrency space. Our focus is on excluding terrorists, war
            criminals and the worst amongst society from their crypto funds. For
            this reason we do not tolerate any discrimination, abuse or
            political debate on our channels.
          </p>
        </ReadingSection>

        <ReadingSection title="Submitting Findings">
          <p>
            When submitting your findings, you agree to StrategyTribe terms of
            service. All the information in the findings you submit must be your
            own, valid and correct. You must fill in all the required fields to
            successfully submit your findings.
          </p>

          <p>
            Be mindful that StrategyTribe does not guarantee all submissions
            will be reviewed. Bounties and their rewards are awarded on a “first
            come, first served” basis; someone might have submitted their
            findings before you and therefore be reviewed and awarded the reward
            first.
          </p>

          <p>
            Bounties have required and optional fields. These fields vary
            depending on the bounty, but the chances of your findings being
            approved increase the more evidence you provide in your submission.
          </p>
        </ReadingSection>

        <ReadingSection title="Judging">
          <p>
            The judging criteria for bounties are the same regardless of the
            type of bounty you have chosen to pursue.
          </p>

          <p>
            When reflecting on whether your submission meets the minimum
            standard required to be accepted:
          </p>
          <div className="py-2">
            <ul className="space-y-5">
              <li>
                <h5>Are you submitting enough evidence and details?</h5>
                <p className="ml-2">
                  You should submit at least one piece of information that
                  matches the bounty description. At least one email, for
                  example.
                </p>
              </li>

              <li>
                <h5>
                  Are you confident about the information you are submitting?
                </h5>
                <p className="ml-2">
                  StrategyTribe has a strict policy against theft of data,
                  harassment, and bullying. You must have full ownership of your
                  findings and your submission should only be related to the
                  information on the bounty.
                </p>
              </li>

              <li>
                <h5>
                  Can StrategyTribe easily replicate the links you have made?
                  (The connection between the bounty and your submission must be
                  solid and clear).
                </h5>
                <p className="ml-2">
                  In order to ensure your information is trustworthy, our staff
                  must be able to reach the same conclusion following the same
                  steps as you. You can submit screenshots of your process or
                  even a step-by-step guide.
                </p>
              </li>
            </ul>
          </div>

          <p>
            Bounties have required and optional fields. These fields vary
            depending on the bounty, but the chances of your findings being
            approved increase the more evidence you provide in your submission.
          </p>

          <p>
            The staff will judge your submission based on the evidence you have
            provided. StrategyTribe does not guarantee all submissions will be
            reviewed. Bounties and their rewards are awarded on a “first come,
            first served” basis, we will only reward the first submission that
            matches all of the requirements. This means that all the required
            fields are complete and that there is enough evidence for the staff
            to replicate your steps and arrive at the same conclusion.
          </p>
        </ReadingSection>

        <ReadingSection title="Community Rules">
          <p>
            StrategyTribe has a strict no-bullying and no-harassment policy.
            StrategyTribe condemns any form of crime and theft of data,
            therefore, it is reinforced that you must have full ownership of
            your findings. StrategyTribe reserves the right to sanction or expel
            any member at any time if our code of conduct is not respected.
          </p>
        </ReadingSection>

        <hr className="text-surface" />

        <h1 className="text-on-surface-p0">Strategy Tribe Service Agreement</h1>

        <ReadingSection>
          <p>
            Strategy Tribe (the Project), with its assigned staff, dedicated to
            crowdsourcing and crowdfunding of open source intelligence, locating
            the cryptowallets of threat actors in the aid of public good. This
            agreement (the Agreement) sets out the terms governing access to and
            participation in the Project. Ongoing permission to contribute to
            the Project is contingent upon researchers’ adherence to the
            Agreement.
          </p>
        </ReadingSection>

        <ReadingSection title="Definitions">
          <p>In this Agreement the following terms apply:</p>

          <table className="border-separate border-spacing-0 border border-surface text-left">
            <thead className="label-lg text-on-surface-unactive">
              <tr className="[&>*]:border-[0.5px] [&>*]:border-surface [&>*]:p-2">
                <th>Term</th>
                <th>Definition</th>
              </tr>
            </thead>
            <tbody>
              <tr className="[&>*]:body [&>*]:border-[0.5px] [&>*]:border-surface [&>*]:p-2">
                <th>Bounty</th>
                <th>
                  An amount associated to a Proposal, to be paid out to the
                  Researcher whose Finding is the first to pass Verification.
                </th>
              </tr>
              <tr className="[&>*]:body [&>*]:border-[0.5px] [&>*]:border-surface [&>*]:p-2">
                <th>Finding</th>
                <th>
                  Verifiable information identifying the ownership of a
                  cryptowallet, submitted by a Researcher.
                </th>
              </tr>

              <tr className="[&>*]:body [&>*]:border-[0.5px] [&>*]:border-surface [&>*]:p-2">
                <th>Good Standing</th>
                <th>
                  The situation of remaining in compliance with this Agreement
                  and in particularly the Code of Conduct for Researchers set
                  out below
                </th>
              </tr>
              <tr className="[&>*]:body [&>*]:border-[0.5px] [&>*]:border-surface [&>*]:p-2">
                <th>Platform</th>
                <th>
                  The cryptowallet identification service operated by the
                  Project.
                </th>
              </tr>
              <tr className="[&>*]:body [&>*]:border-[0.5px] [&>*]:border-surface [&>*]:p-2">
                <th>Project</th>
                <th>
                  Strategy Tribe with its assigned staff, dedicated to
                  crowdsourcing and crowdfunding of open source intelligence,
                  locating the cryptowallets of threat actors.
                </th>
              </tr>
              <tr className="[&>*]:body [&>*]:border-[0.5px] [&>*]:border-surface [&>*]:p-2">
                <th>Proposal</th>
                <th>
                  A standing request, with assigned Bounty, for information
                  concerning the identity of cryptowallet owners, or threat
                  actor information with attached criteria for Findings.
                </th>
              </tr>
              <tr className="[&>*]:body [&>*]:border-[0.5px] [&>*]:border-surface [&>*]:p-2">
                <th>Researcher</th>
                <th>
                  Any person using the Project’s services to submit a Finding.
                </th>
              </tr>
              <tr className="[&>*]:body [&>*]:border-[0.5px] [&>*]:border-surface [&>*]:p-2">
                <th>Verification</th>
                <th>
                  The process whereby Project staff review a Finding to confirm
                  it meets the associated Proposal’s criteria.
                </th>
              </tr>
            </tbody>
          </table>
        </ReadingSection>

        <ReadingSection title="Agreement" spacing="space-y-8">
          <div className="space-y-6">
            <h3>The service</h3>
            <p>
              Subject to remaining in Good Standing, and to acceptance of the
              terms of our Privacy Policy, Researchers may access and use the
              Platform to submit Findings.
            </p>

            <p>
              Subject to successful Verification, the Project will within ten
              working days arrange to make payment of the associated Bounty to
              the finding Researcher’s registered cryptowallet.
            </p>

            <p>
              The Project will use its best endeavours to complete Verifications
              and to ensure the continuous availability of the Platform, but no
              warranty or guarantee is given in this regard.
            </p>

            <p>
              The Project reserves the right to may changes to all or any part
              of the Platform, in the interests of continuous service
              improvement.
            </p>

            <p>
              The Project reserves the right to withdraw the Platform at any
              time, for any reason.
            </p>

            <p>
              The Project reserves the right to terminate a Researcher’s access
              to the Platform at any time, for any reason. Researchers
              acknowledge that in the interests of individual and nation
              security, the Project will not always be able to give reasons for
              this termination.
            </p>
          </div>

          <div className="space-y-6">
            <h3>Researchers</h3>
            <p>
              Researchers confirm that they are over the age of 18. Persons
              under the age of 18 are ineligible to participate in the Project.
            </p>
            <p>
              Researchers may browse Proposals in order to decide whether to
              submit Findings.
            </p>
            <p>
              Researchers are independent of Strategy Tribe and nothing in this
              Agreement creates a relationship of employer and employee.
              Researchers are thus solely responsible to account for income tax
              in their relevant jurisdictions in relation to any Bounty payment
              received.
            </p>
            <p>
              In their independent capacity, Researchers bear sole
              responsibility for the information submitted in a Finding and for
              any expenses incurred in the course of preparing a Finding.
            </p>
            <p>
              Researchers must read and comply with the Project’s Privacy
              Policy.
            </p>
          </div>

          <div className="space-y-6">
            <h3>Findings</h3>
            <p>
              Strategy Tribe does not endorse Findings. The Verification process
              confirms the probable (but not absolute) validity of a Finding.
            </p>
            <p>
              By submitting a Finding, Researchers confirm the contents of the
              Finding to be true to the best of the Researcher’s information,
              knowledge and belief.
            </p>
            <p>
              Strategy Tribe reserves the right to reject any Finding that
              identifies or places at risk a minor.
            </p>
            <p>
              By submitting a Finding, Researchers confirm release of any and
              all claims of intellectual property rights associated to the
              contents of the Finding to the Project.
            </p>
            <p>
              If a question of national security interests arises,
              notwithstanding payment of a Bounty, the Project reserves the
              right not to release the Finding publicly.
            </p>
          </div>

          <div className="space-y-6">
            <h3>Code of Conduct for Researchers</h3>
            <p>To remain in Good Standing Researchers must:</p>

            <ul className="list-disc space-y-2">
              <li>
                Observe and abide by all relevant local and international laws,
                including, but not limited to, laws governing the protection of
                technology and services.
              </li>
              <li>
                Refrain from physical or cyberattacks against any individual,
                organisation or service. Not publish the contents of Findings
                prior to payment of any Bounty related to the associated
                Proposal.
              </li>
              <li>
                Under no circumstances post information from a Finding on forums
                which support or endorse criminal activity (e.g., “darknet”
                forums).
              </li>
              <li>
                Not pursue, harass, threaten, or extort any person or
                organisation who is or may be the subject of a Proposal or
                Finding.
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h3>Warranty</h3>
            <p>
              EXCEPT AS SPECIFICALLY STATED, THE PLATFORM IS PROVIDED “AS IS,”
              WITHOUT WARRANTY OF ANY KIND. WITHOUT LIMITATION, THE PROJECT
              EXPLICITLY DISCLAIMS ANY WARRANTIES OF MERCHANTABILITY, FITNESS
              FOR A PARTICULAR PURPOSE OR NON-INFRINGEMENT, AND ANY WARRANTIES
              ARISING OUT OF COURSE OF DEALING, CUSTOM, OR USAGE OF TRADE. The
              Project makes no warranty that the Platform will meet a
              Researcher’s specific requirements or be available on an
              uninterrupted, secure, or error-free basis.
            </p>
          </div>
          <div className="space-y-6">
            <h3>Indemnity</h3>
            <p>
              The Researcher indemnifies the Project and its officers,
              directors, employees, and agents, from and against any claims,
              disputes, demands, liabilities, damages, losses, and costs and
              expenses, including, without limitation, reasonable legal and
              accounting fees arising out of a third party claim that the
              Researcher’s Finding infringes upon a patent, copyright,
              trademark, or trade secret of a third party, or arising from the
              Researcher’s use of the Platform in violation of this Agreement.
            </p>
          </div>
          <div className="space-y-6">
            <h3>Term and termination</h3>
            <p>
              This Agreement will commence upon registration with the Project
              and will continue until terminated by either party in accordance
              with the terms of this Agreement. Either party may terminate this
              Agreement immediately upon written notice to the other party (the
              Defaulting Party) if the Defaulting Party has materially breached
              a provision of this Agreement, and that breach subsists for thirty
              days after the Defaulting Party receives notice of that breach.
            </p>
          </div>
        </ReadingSection>

        <AfterRead />
      </div>
    </>
  );
};

RulesPage.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};
export default RulesPage;
