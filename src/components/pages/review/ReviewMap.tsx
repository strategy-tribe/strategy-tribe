import { Button, ButtonStyle } from '@/components/utils/Button';
import FromBounty from '@/components/utils/FromBounty';
import { Submission as SubmissionData } from '@/lib/models';
import React from 'react';
import { GoToSubmissionPage } from '@/lib/utils/Routes';
import { UserAnswer } from './UserAnswer';

export function ReviewMap({ submission }: { submission: SubmissionData }) {
  return (
    <aside className="max-w-sm sticky top-24 left-0 min-h-screen bg-surface-dark space-y-8 p-8">
      <Button
        info={{
          style: ButtonStyle.Text,
          icon: 'arrow_back',
          label: 'back',
          removePadding: true,
          removeMinWidth: true,
        }}
      />

      <div className="space-y-2">
        <FromBounty bountyId={submission.bountyId} />
        <div>
          <h3 className="title">User Submission</h3>

          <Button
            info={{
              style: ButtonStyle.TextPurple,
              label: 'See full submission',
              isALink: GoToSubmissionPage(submission.id!),
              removeMinWidth: true,
              removePadding: true,
              className: 'text-left w-fit',
            }}
          />
        </div>
      </div>

      <div className="space-y-4 w-full">
        {submission.answers
          .filter((a) => a.answer && a.answer.length > 0)
          .map((answer, i) => {
            return <UserAnswer key={i} answer={answer} num={i + 1} />;
          })}
      </div>
    </aside>
  );
}
