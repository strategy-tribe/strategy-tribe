import { useRouter } from 'next/router';

import { GoToBountyPage } from '@/lib/utils/Routes';

import { EditSubmission } from './EditSubmission';
import {
  NewSubmissionContextProvider,
  useNewSubmissionContext,
} from './NewSubmissionContext';
import { NewSubmissionHeader } from './NewSubmissionHeader';
import { ReviewSubmission } from './ReviewSubmission';
import { Section } from '../../landing/Section';

export function NewSubmission({ bountyId }: { bountyId: string }) {
  const router = useRouter();

  function redirectToBounty() {
    router.push(GoToBountyPage(bountyId as string));
  }

  return (
    <NewSubmissionContextProvider
      bountyId={bountyId as string}
      redirectToBounty={redirectToBounty}
    >
      <Content />
    </NewSubmissionContextProvider>
  );
}

function Content() {
  const { editPhase } = useNewSubmissionContext();

  return (
    <Section>
      <div className="mx-auto max-w-5xl space-y-7 rounded-xl bg-surface-dark px-8 pb-8">
        <NewSubmissionHeader />
        {editPhase && <EditSubmission />}
        {!editPhase && <ReviewSubmission />}
      </div>
    </Section>
  );
}
