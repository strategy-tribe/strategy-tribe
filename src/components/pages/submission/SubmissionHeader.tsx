import { useAuth } from 'auth/AuthContext';

import { SubmissionState } from '@/lib/models';
import { GoToReviewSubmissionPage } from '@/lib/utils/Routes';

import { Button, ButtonStyle } from '@/components/utils/Button';
import Icon, { IconSize } from '@/components/utils/Icon';

import { SubmissionStatus } from '../bounty/SubmissionStatus';
import { Section } from '../landing/Section';
import { useSubmissionContext } from './SubmissionContext';

export function SubmissionHeader() {
  const { submission, bounty } = useSubmissionContext();
  const { isStaff, isAdmin } = useAuth();
  return (
    <header className="border-y-2 border-main py-10">
      <Section className="text-center space-y-2">
        <div>
          <span className="label text-on-surface-unactive">
            {isStaff ? 'Submission to' : 'Your submission to'}
          </span>

          <h1 className="h4 text-on-surface-p0 max-w-3xl mx-auto">
            {bounty?.title}
          </h1>
        </div>

        <div className="flex flex-col items-center space-y-1">
          <span>is</span>
          <SubmissionStatus status={submission.state} />
        </div>

        {(isAdmin || isStaff) &&
          submission.state === SubmissionState.WaitingForReview && (
            <div className="flex items-center justify-center flex-col pt-4 gap-4">
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
                  isALink: GoToReviewSubmissionPage(submission.id!),
                }}
              />
            </div>
          )}
      </Section>
    </header>
  );
}
