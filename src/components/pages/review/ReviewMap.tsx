import { Requirement, Submission } from '@prisma/client';

import { GoToSubmissionPage } from '@/lib/utils/Routes';

import { Button, ButtonStyle } from '@/components/utils/Button';
import FromBounty from '@/components/utils/FromBounty';

import { UserAnswer } from './UserAnswer';

export function ReviewMap({
  submission,
  requirements,
}: {
  submission: Submission;
  requirements: Requirement[];
}) {
  return (
    <aside className="grow max-w-sm sticky top-24 left-0 min-h-screen bg-surface-dark space-y-8 p-8">
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
        <FromBounty bountyId={submission.bountyId ?? ''} />
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

      <div className="space-y-4 w-full">
        {submission.answers
          .filter((a) => a.length > 0)
          .map((answer, i) => {
            return (
              <UserAnswer
                key={i}
                content={answer}
                requirement={requirements[i]}
                num={i + 1}
              />
            );
          })}
      </div>
    </aside>
  );
}
