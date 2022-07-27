import { useNotification } from '@/components/notifications/NotificationContext';
import { Submission, SubmissionState } from '@/models/index';
import { useSubmitReview } from '@/hooks/reviewHooks';
import { useGetSubmission } from '@/hooks/submissionHooks';
import { GoToBountiesPage } from '@/utils/Routes';
import { useAuth } from 'auth/AuthContext';
import { useRouter } from 'next/router';
import React, { useMemo, useState } from 'react';
import {
  DelayType,
  NotificationStyle,
  NotificationType,
} from '@/components/notifications/iNotification';
import Icon from '@/components/utils/Icon';
import { ImportantMessage } from '@/components/utils/Warning';
import { Title } from '@/components/utils/Title';
('@/components/utils/Title');
import { RadioInput } from '@/components/utils/RadioInput';
import { Button, ButtonStyle } from '@/components/utils/Button';

export default function Evaluate({ submissionId }: { submissionId: string }) {
  const [meetsRequirements, setGood] = useState<string | undefined>(undefined);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const { userId: user } = useAuth();
  const { submission } = useGetSubmission(submissionId);

  const { notify: notify } = useNotification();

  const canSubmit = useMemo(() => {
    return typeof meetsRequirements === 'string' && acceptedTerms;
  }, [meetsRequirements, acceptedTerms]);

  return (
    <div className="space-y-6 max-w-xl">
      <div className="space-y-6 py-2">
        <Title
          title="Does the findings meet the bounty requirements?"
          big={true}
        />

        <RadioInput
          label="No"
          text="The requirements are not meet in this submission"
          icon="close"
          group="good"
          pickMe={setGood}
          value={meetsRequirements}
        />
        <RadioInput
          label="Yes"
          text="The findings match the requirements perfectly"
          icon="check"
          group="good"
          pickMe={setGood}
          value={meetsRequirements}
        />
      </div>

      {/* Warning */}
      <ImportantMessage message="All reviews and transactions are stored along with your staff address." />

      {/* Checkbox */}
      <div className="flex items-center space-x-4 pr-2">
        <input
          type="checkbox"
          id="terms"
          className="checked:bg-main focus:text-main hover:text-main border-0"
          onChange={(e) => {
            setAcceptedTerms(e.target.checked);
          }}
        />
        <label htmlFor="terms" className="w-full">
          {'I, '}
          <span
            className="font-semibold text-main-light underline cursor-pointer"
            onClick={() => {
              notify(
                {
                  title: "You're logged in as",
                  content: user as string,
                  icon: 'info',
                },
                {
                  condition: false,
                  delayTime: 5,
                  type: NotificationType.Banner,
                  delayType: DelayType.Time,
                }
              );
              // notify("You're logged in as", user as string, DelayType.Time, 5);
            }}
          >
            of wallet address
          </span>
          {', carefully read and evaluated this submission'}
        </label>
      </div>

      {canSubmit && user && submission && (
        <SubmitReviewButton
          submission={submission}
          review={{
            feedback: '',
            meetsRequirements:
              (meetsRequirements as string) === 'Yes' ? true : false,
            reviewer: user,
          }}
        />
      )}
    </div>
  );
}

export function SubmitReviewButton({
  submission,
  review,
}: {
  submission: Submission;
  review: {
    meetsRequirements: boolean;
    reviewer: string;
    feedback: string;
  };
}) {
  const router = useRouter();

  const { notify } = useNotification();

  const { SubmitReview } = useSubmitReview(
    review.meetsRequirements
      ? SubmissionState.Accepted
      : SubmissionState.Rejected,
    submission,
    review.reviewer,
    review.feedback,
    () => {
      router.push(GoToBountiesPage());
      notify({
        title: 'Review submitted',
        style: NotificationStyle.success,
      });
    },
    (e) => {
      notify({
        title: 'There was an issue submitting the review',
        content: e,
        icon: 'warning',
        style: NotificationStyle.error,
      });
    }
  );
  return (
    <Button
      info={{
        icon: 'publish',
        style: ButtonStyle.Filled,
        onClick: SubmitReview,
        label: 'Submit review',
        disabled: !review.meetsRequirements,
      }}
    />
  );
}
