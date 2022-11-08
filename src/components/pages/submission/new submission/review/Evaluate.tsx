import { ReviewGrade, Submission } from '@prisma/client';
import { useAuth } from 'auth/AuthContext';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';

import { GoToReviewsPage } from '@/lib/utils/Routes';
import { useSubmitReview } from '@/hooks/reviewHooks';
import { useGetSubmission } from '@/hooks/submissionHooks';

import {
  DelayType,
  NotificationStyle,
  NotificationType,
} from '@/components/notifications/iNotification';
import { useNotification } from '@/components/notifications/NotificationContext';
import { Button, ButtonStyle } from '@/components/utils/Button';
import { RadioInput } from '@/components/utils/RadioInput';
import { Title } from '@/components/utils/Title';
import { ImportantMessage } from '@/components/utils/Warning';

('@/components/utils/Title');

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
    <div className="max-w-xl space-y-6">
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
          className="border-0 checked:bg-main hover:text-main focus:text-main"
          onChange={(e) => {
            setAcceptedTerms(e.target.checked);
          }}
        />
        <label htmlFor="terms" className="w-full">
          {'I, '}
          <span
            className="cursor-pointer font-semibold text-main-light underline"
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
            }}
          >
            of wallet address
          </span>
          , carefully read and evaluated this submission
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
  disabled,
}: {
  submission: Submission;
  review: {
    meetsRequirements: boolean;
    reviewer: string;
    feedback: string;
  };
  disabled?: boolean;
}) {
  const router = useRouter();

  const { notify } = useNotification();

  const { SubmitReview } = useSubmitReview(
    review.meetsRequirements ? ReviewGrade.Accepted : ReviewGrade.Rejected,
    submission,
    review.reviewer,
    review.feedback,
    () => {
      router.push(GoToReviewsPage());
      notify(
        {
          title: 'Review submitted',
          style: NotificationStyle.success,
        },
        {
          condition: false,
          delayTime: 5,
          delayType: DelayType.Time,
          type: NotificationType.Pill,
        }
      );
    },
    (e) => {
      notify(
        {
          title: 'There was an issue submitting the review',
          content: e,
          icon: 'warning',
          style: NotificationStyle.error,
        },
        {
          condition: false,
          delayTime: 5,
          delayType: DelayType.Time,
          type: NotificationType.Pill,
        }
      );
    }
  );
  return (
    <Button
      info={{
        icon: 'arrow_forward',
        style: ButtonStyle.Filled,
        onClick: () => {
          const confirmed = window.confirm(
            `Your review will set this submission as ${
              review.meetsRequirements ? 'Accepted' : 'Rejected'
            }`
          );
          if (confirmed) SubmitReview();
        },
        label: 'Yes, this is the grade it deserves',
        disabled: disabled,
        className: 'h-fit',
      }}
    />
  );
}
