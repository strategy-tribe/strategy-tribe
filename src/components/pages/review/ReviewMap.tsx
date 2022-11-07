import { Button, ButtonStyle } from '@/components/utils/Button';
import FromBounty from '@/components/utils/FromBounty';
import { FullSubmission } from '@/lib/types';
import { GoToSubmissionPage } from '@/lib/utils/Routes';
import router from 'next/router';
import { UserAnswer } from './UserAnswer';

export function ReviewMap({
  submission,
}: {
  submission: FullSubmission;
}) {
  return (
    <aside className="sticky left-0 max-w-sm min-h-screen p-8 space-y-8 grow top-24 bg-surface-dark">
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
        <FromBounty bountyId={submission.bounty?.slug ?? ''} />
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
