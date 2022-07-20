import React from 'react';
import { SubmissionStatus } from '../bounty/SubmissionStatus';
import { useAuth } from 'auth/AuthContext';
import { Section } from '../landing/Section';
import { useSubmissionContext } from './SubmissionContext';
import { Button, ButtonStyle } from '@/components/utils/Button';
import { GoToReviewSubmissionPage } from '@/lib/utils/Routes';
import { SubmissionState } from '@/lib/models';
import Icon from '@/components/utils/Icon';

export function SubmissionHeader() {
  const { submission, bounty } = useSubmissionContext();
  const { isStaff, isAdmin } = useAuth();
  return (
    <header className="border-y-2 border-purpleDark py-10">
      <Section className="text-center space-y-2">
        <div>
          <span className="label text-unactive">
            {isStaff ? 'Submission to' : 'Your submission to'}
          </span>

          <h1 className="h4 text-white max-w-3xl mx-auto">{bounty?.title}</h1>
        </div>

        <div className="flex flex-col items-center space-y-1">
          <span>is</span>
          <SubmissionStatus status={submission.state} />
        </div>

        {(isAdmin || isStaff) &&
          submission.state === SubmissionState.WaitingForReview && (
            <div className="grid place-items-center pt-4 group">
              <Icon
                icon="arrow_forward"
                className="rotate-90 peer-hover:translate-y-1 transition-transform ease-in-out duration-300"
              />

              <Button
                info={{
                  className: 'w-fit peer',
                  label: 'Review',
                  style: ButtonStyle.Text,
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
