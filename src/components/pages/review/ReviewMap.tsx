import router from 'next/router';

import { GoToSubmissionPage } from '@/lib/utils/Routes';

import { Button, ButtonStyle } from '@/components/utils/Button';
import FromBounty from '@/components/utils/FromBounty';

import { FullSubmission } from '@/server/routes/submission/getSubmission';

import { UserAnswer } from './UserAnswer';

export function ReviewMap({ submission }: { submission: FullSubmission }) {
  return (
    <aside className="left-0 top-24 mb-4 w-full grow space-y-8 bg-surface-dark p-8 tablet:sticky tablet:min-h-screen tablet:max-w-sm bt:max-w-xl">
      <Button
        info={{
          style: ButtonStyle.Text,
          icon: 'arrow_back',
          onClick: () => router.push(GoToSubmissionPage(submission.id)),
          label: 'back',
          removePadding: true,
          removeMinWidth: true,
        }}
      />

      <div className="space-y-2">
        <FromBounty slug={submission.bounty?.slug ?? ''} />
        <div>
          <h3 className="title">User Submission</h3>

          <Button
            info={{
              style: ButtonStyle.TextPurple,
              label: 'See full submission',
              isALink: GoToSubmissionPage(submission.id),
              removeMinWidth: true,
              removePadding: true,
              className: 'text-left w-fit',
            }}
          />
        </div>
      </div>

      <div className="w-full space-y-4">
        {submission.answers?.map((answer, i) => {
          return (
            <UserAnswer
              key={i}
              content={answer.answer}
              requirement={answer.requirement}
              num={i + 1}
            />
          );
        })}
      </div>
    </aside>
  );
}
