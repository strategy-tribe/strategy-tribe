import { Submission as SubmissionData } from '@/lib/models';

import { SubmissionBody } from './SubmissionBody';
import { SubmissionContextProvider } from './SubmissionContext';
import { SubmissionHeader } from './SubmissionHeader';

export function Submission({ submission }: { submission: SubmissionData }) {
  return (
    <SubmissionContextProvider submission={submission}>
      <div className="space-y-8">
        <SubmissionHeader />
        <SubmissionBody />
      </div>
    </SubmissionContextProvider>
  );
}
