import { SubmissionState } from '@prisma/client';

import { GetDateInString } from '@/lib/utils/DateHelpers';

import { useSubmissionContext } from './SubmissionContext';
import { SubmissionDetail } from './SubmissionDetail';

export function SubmissionDetails() {
  const { submission, bounty } = useSubmissionContext();

  return (
    <div className="mx-auto max-w-[90rem] border-b-2 border-surface-dark pb-6">
      <div className="mx-auto max-w-5xl flex items-center  gap-8">
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
              copyable
            />
          </>
        )}

        {submission.state ===
          (SubmissionState.Accepted || SubmissionState.WaitingForPayment) && (
          <>
            <SubmissionDetail
              label="Reward"
              value={`${bounty?.wallet.balance} MATIC`}
            />
          </>
        )}

        <SubmissionDetail label="Status" value={submission.state} />

        <SubmissionDetail
          label="Submission ID"
          value={submission.id}
          copyable
        />

        <SubmissionDetail
          label="User ID"
          value={submission.authorId}
          copyable
        />
      </div>
    </div>
  );
}
