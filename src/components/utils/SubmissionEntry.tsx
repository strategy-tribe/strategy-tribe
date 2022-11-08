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
      className={`group flex w-full justify-between `}
      onClick={() => router.push(GoToSubmissionPage(submission.id as string))}
    >
      <div className="flex flex-col text-left">
        {/* Submission ID */}
        <p className={fullSize ? 'body-lg' : 'body'}>
          <span>S#</span>
          <span className="text-main-light underline group-hover:text-main-light group-hover:underline laptop:text-on-surface-p1 laptop:no-underline">
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
          className="transition-transform ease-in-out group-hover:translate-x-2"
          icon="arrow_forward"
        />
      )}
    </button>
  );
};

function SubmissionStateIconInfo({ state }: { state: SubmissionState }) {
  return (
    <div className="group relative flex items-center gap-2 text-on-surface-unactive">
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
