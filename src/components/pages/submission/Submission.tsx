import { FullSubmission } from '@/server/routes/submission/getSubmission';

import { SubmissionBody } from './SubmissionBody';
import { SubmissionContextProvider } from './SubmissionContext';
import { SubmissionHeader } from './SubmissionHeader';

export function Submission({ submission }: { submission: FullSubmission }) {
  return (
    <SubmissionContextProvider submission={submission}>
      <div className="space-y-6 p-4">
        <SubmissionHeader />
        <SubmissionBody />
      </div>
    </SubmissionContextProvider>
  );
}
