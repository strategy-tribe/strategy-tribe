import { RenderMarkdown } from '@/components/utils/RenderMarkdown';

import { useSubmissionContext } from './SubmissionContext';

export function SubmissionReview() {
  const { submission } = useSubmissionContext();

  if (!submission.review) return <></>;

  return (
    <div className="mx-auto max-w-5xl space-y-4">
      <h2 className="title-sm text-on-surface-p0">Review</h2>

      {!!submission.review.content && (
        <RenderMarkdown text={submission.review.content} />
      )}
    </div>
  );
}
