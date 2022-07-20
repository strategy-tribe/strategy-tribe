import React from 'react';
import { SubmissionState } from '@/lib/models';
import { GetDateInString } from '@/lib/utils/DateHelpers';
import { useSubmissionContext } from './SubmissionContext';
import { SubmissionDetail } from './SubmissionDetail';

export function SubmissionDetails() {
  const { submission, bounty } = useSubmissionContext();
  return (
    <div className="mx-auto max-w-[90rem] border-b-2 border-darker pb-4">
      <div className="mx-auto max-w-5xl flex items-center gap-8">
        <SubmissionDetail
          label="Submitted"
          value={GetDateInString(submission.createdAt) + ' ago'}
          icon="schedule"
        />

        {submission.review && (
          <>
            <SubmissionDetail
              label="Reviewed"
              value={GetDateInString(submission.review?.createdAt) + ' ago'}
            />

            <SubmissionDetail
              label="Reviewer ID"
              value={`${submission.review?.reviewerId}`}
            />
          </>
        )}

        {submission.state ===
          (SubmissionState.Accepted || SubmissionState.WaitingForPayment) && (
          <>
            <SubmissionDetail label="Reward" value={`${bounty?.funds} MATIC`} />
          </>
        )}

        <SubmissionDetail label="Status" value={submission.state} />
      </div>
    </div>
  );
}
