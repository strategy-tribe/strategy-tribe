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

export function NewSubmission({ bountySlug }: { bountySlug: string }) {
  const router = useRouter();

  function redirectToBounty() {
    router.push(GoToBountyPage(bountySlug as string));
  }

  return (
    <NewSubmissionContextProvider
      bountyId={bountySlug as string}
      redirectToBounty={redirectToBounty}
    >
      <Content />
    </NewSubmissionContextProvider>
  );
}

function Content() {
  const { editPhase } = useNewSubmissionContext();

  return (
    <Section className="max-w-8xl">
      <div className="max-w-9xl mx-auto space-y-7 rounded-xl bg-surface-dark px-8 pb-8">
        <NewSubmissionHeader />
        {editPhase && <EditSubmission />}
        {!editPhase && <ReviewSubmission />}
      </div>
    </Section>
  );
}
