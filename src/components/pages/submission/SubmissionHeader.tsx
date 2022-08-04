import { useAuth } from 'auth/AuthContext';

import { SubmissionState } from '@/lib/models';
import { GoToBountyPage, GoToReviewSubmissionPage } from '@/lib/utils/Routes';

import { Button, ButtonStyle } from '@/components/utils/Button';
import Icon, { IconSize } from '@/components/utils/Icon';

import { SubmissionStatus } from '../bounty/SubmissionStatus';
import { Section } from '../landing/Section';
import { useSubmissionContext } from './SubmissionContext';

export function SubmissionHeader() {
  const { submission, bounty } = useSubmissionContext();
  const { isStaff, isAdmin } = useAuth();

  const color = isAdmin || isStaff ? 'border-success' : 'border-main';

  return (
    <header className={`${color} border-y-2 py-10`}>
      <Section className="text-center space-y-2">
        <div>
          <span className="label text-on-surface-unactive ">
            {isStaff ? 'Submission to' : 'Your submission to'}
          </span>

          {bounty && (
            <a
              href={GoToBountyPage(bounty?.id)}
              rel="noopener noreferrer"
              target="_blank"
              className="h4 text-on-surface-p1 max-w-3xl mx-auto block hover:text-main-light"
            >
              {bounty?.title}
            </a>
          )}
        </div>

        <div className="flex flex-col items-center space-y-1">
          <span>is</span>
          <SubmissionStatus status={submission.state} />
        </div>

        {(isAdmin || isStaff) &&
          submission.state === SubmissionState.WaitingForReview && (
            <div className="flex items-center justify-center flex-col pt-4 gap-4 h-fit">
              <div className="flex gap-2 items-center">
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
