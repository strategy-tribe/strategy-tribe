import { Section } from '@/components/pages/landing/Section';
import AppLayout from '@/components/layouts/AppLayout';
import React from 'react';
import { NextPageWithLayout } from './_app';

const RulesPage: NextPageWithLayout = () => {
  return (
    <div className="mx-auto max-w-5xl space-y-8 pt-16">
      <Section>
        <h1>Submission rules</h1>
      </Section>

      <Section className="flex flex-col gap-6">
        <p className="max-w-xl">
          When submitting your findings, you agree to StrategyTribe terms of
          service. All the information in the findings you submit must be your
          own, valid and correct.
          <br />
          <br />
          You must fill in all the required fields to successfully submit your
          findings. Be mindful that StrategyTribe does not guarantee all
          submissions will be reviewed. Bounties and their rewards are awarded
          on a “first come, first served” basis; someone might have submitted
          their findings before you and therefore be reviewed and awarded the
          reward first.
          <br />
          <br />
          StrategyTribe has a strict no-bullying and no-harassment policy.
          <br />
          <br />
          StrategyTribe condemns any form of crime and theft of data, you must
          have full ownership of your findings.
          <br />
          <br />
          StrategyTribe reserves the right to sanction or expel any member at
          any time if our code of conduct is not respected. When submitting your
          findings, you agree to our terms of service. All the information in
          the findings you submit must be your own, valid and correct. You must
          fill in all the required fields to successfully submit your findings.
        </p>

        {/* <a href="#" className="text-main-light hover:text-main label-lg">
          See our full terms of service
        </a> */}
      </Section>
    </div>
  );
};

RulesPage.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};
export default RulesPage;
