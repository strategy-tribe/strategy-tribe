import { Button, ButtonStyle } from '@/components/utils/Button';
import { GoToReviewSubmissionPage } from '@/lib/utils/Routes';
import React from 'react';
import { useSubmissionContext } from './SubmissionContext';

export function SubmissionReview() {
  const { submission } = useSubmissionContext();

  if (!submission.review) return <>qojweoreqwkorew</>;

  return (
    <div className="mx-auto max-w-5xl space-y-4">
      <h2 className="title-sm text-white">Review</h2>

      <p className="whitespace-pre-wrap body">
        {submission.review.reviewerComment}
      </p>
    </div>
  );
}
