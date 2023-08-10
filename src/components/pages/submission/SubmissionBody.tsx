import { SubmissionContent } from './SubmissionContent';
import { SubmissionDetails } from './SubmissionDetails';
import { SubmissionReview } from './SubmissionReview';

export function SubmissionBody() {
  return (
    <div className="space-y-8">
      <SubmissionDetails />
      <SubmissionContent />
      <SubmissionReview />
    </div>
  );
}
