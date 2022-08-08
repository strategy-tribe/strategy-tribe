import AppLayout from '@/components/layouts/AppLayout';
import {
  AfterRead,
  ReadingSection,
  SectionContent,
} from '@/components/reading/utils';

import { NextPageWithLayout } from './_app';

const RulesPage: NextPageWithLayout = () => {
  return (
    <>
      <ReadingSection title="Submission rules">
        <SectionContent
          content={` When submitting your findings, you agree to StrategyTribe terms of
          service. All the information in the findings you submit must be your
          own, valid and correct.
         \n
          You must fill in all the required fields to successfully submit your
          findings. Be mindful that StrategyTribe does not guarantee all
          submissions will be reviewed. Bounties and their rewards are awarded
          on a “first come, first served” basis; someone might have submitted
          their findings before you and therefore be reviewed and awarded the
          reward first.
      \n
          StrategyTribe has a strict no-bullying and no-harassment policy.
      \n
          StrategyTribe condemns any form of crime and theft of data, you must
          have full ownership of your findings.
      \n
          StrategyTribe reserves the right to sanction or expel any member at
          any time if our code of conduct is not respected. When submitting your
          findings, you agree to our terms of service. All the information in
          the findings you submit must be your own, valid and correct. You must
          fill in all the required fields to successfully submit your findings.`}
        />
      </ReadingSection>
      <AfterRead />
    </>
  );
};

RulesPage.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};
export default RulesPage;
