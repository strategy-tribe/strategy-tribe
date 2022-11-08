import { SubmissionState } from '@prisma/client';
import { useAuth } from 'auth/AuthContext';

import { GoToBountyPage, GoToReviewSubmissionPage } from '@/lib/utils/Routes';

import { SubmissionStateDisplayer } from '@/components/pages/bounty/SubmissionStatus';
import { Section } from '@/components/pages/landing/Section';
import { Button, ButtonStyle } from '@/components/utils/Button';
import Icon, { IconSize } from '@/components/utils/Icon';

import { useSubmissionContext } from './SubmissionContext';

export function SubmissionHeader() {
  const { submission, bounty } = useSubmissionContext();
  const { isStaff, isAdmin } = useAuth();

  const color = isAdmin || isStaff ? 'border-success' : 'border-main';

  return (
    <header className={`${color} border-y-2 py-10`}>
      <Section className="space-y-2 text-center">
        <div>
          <span className="label text-on-surface-unactive ">
            {isStaff ? 'Submission to' : 'Your submission to'}
          </span>

          {bounty && (
            <a
              href={GoToBountyPage(bounty?.slug)}
              rel="noopener noreferrer"
              target="_blank"
              className="h4 mx-auto block max-w-3xl text-on-surface-p1 hover:text-main-light"
            >
              {bounty?.title}
            </a>
          )}
        </div>

        <div className="flex flex-col items-center space-y-1">
          <span>is</span>
          <SubmissionStateDisplayer status={submission.state} />
        </div>

        {(isAdmin || isStaff) &&
          submission.state === SubmissionState.WaitingForReview && (
            <div className="flex h-fit flex-col items-center justify-center gap-4 pt-4">
              <div className="flex items-center gap-2">
                <Icon icon="check" size={IconSize.Small} />
                <span className="label">You can review this submission</span>
              </div>

              <Button
                info={{
                  className: 'w-fit peer',
                  label: 'Review',
                  style: ButtonStyle.Filled,
                  icon: 'rule',
                  isALink: GoToReviewSubmissionPage(submission.id),
                }}
              />
            </div>
          )}
      </Section>
    </header>
  );
}
