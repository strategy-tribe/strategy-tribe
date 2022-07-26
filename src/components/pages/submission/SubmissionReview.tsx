import { RenderMarkdown } from '@/components/utils/RenderMarkdown';
import React from 'react';
import { useSubmissionContext } from './SubmissionContext';

export function SubmissionReview() {
  const { submission } = useSubmissionContext();

  if (!submission.review) return <></>;

  return (
    <div className="mx-auto max-w-5xl space-y-4">
      <h2 className="title-sm text-white">Review</h2>

      {!!submission.review.reviewerComment && (
        <RenderMarkdown text={submission.review.reviewerComment} />
      )}
    </div>
  );
}
