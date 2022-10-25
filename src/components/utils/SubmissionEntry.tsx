import { Submission, SubmissionState } from '@prisma/client';
import { useRouter } from 'next/router';

import { GetDateInString } from '@/utils/DateHelpers';
import { GoToSubmissionPage } from '@/utils/Routes';

import Icon from './Icon';

export const SubmissionEntry = ({
  submission,
  fullSize = true,
}: {
  submission: Submission;
  fullSize?: boolean;
}) => {
  const router = useRouter();
  const date = submission.createdAt;

  const howLongAgo = GetDateInString(submission.createdAt);

  const isRecent = howLongAgo.includes('second');
  return (
    <button
      className={`flex justify-between w-full group `}
      onClick={() => router.push(GoToSubmissionPage(submission.id as string))}
    >
      <div className="flex flex-col text-left">
        {/* Submission ID */}
        <p className={fullSize ? 'body-lg' : 'body'}>
          <span>S#</span>
          <span className="underline laptop:no-underline text-main-light laptop:text-on-surface-p1 group-hover:underline group-hover:text-main-light">
            {submission.id}
          </span>
        </p>
        {/* How long ago */}
        {fullSize && (
          <span
            className={`text-left ${
              isRecent ? 'text-on-surface-p0' : 'text-on-surface-unactive'
            }`}
          >
            {'Submitted '}
            {howLongAgo}
            {' ago, '}
            {date.toLocaleString()}
          </span>
        )}
        {/* State */}
        <SubmissionStateIconInfo state={submission.state} />
      </div>
      {fullSize && (
        <Icon
          className="group-hover:translate-x-2 transition-transform ease-in-out"
          icon="arrow_forward"
        />
      )}
    </button>
  );
};

function SubmissionStateIconInfo({ state }: { state: SubmissionState }) {
  return (
    <div className="text-on-surface-unactive flex gap-2 items-center relative group">
      <SubmissionStateIcon state={state} />
      <p>{state}</p>
    </div>
  );
}

function SubmissionStateIcon({ state }: { state: SubmissionState }) {
  switch (state) {
    case SubmissionState.Accepted:
      return <Icon icon="check_circle" />;
    case SubmissionState['Rejected']:
      return <Icon icon="do_not_disturb_on" />;
    case SubmissionState['WaitingForPayment']:
      return <Icon icon="toll" />;
    default:
      return <Icon icon="pending" />;
  }
}
