import { SubmissionState } from '@prisma/client';

export function SubmissionStateDisplayer({
  status,
  isSmall = false,
}: {
  status: SubmissionState;
  isSmall?: boolean;
}) {
  const color = () => {
    switch (status) {
      case SubmissionState.WaitingForReview:
        return 'border-waiting text-waiting';
      case SubmissionState.Accepted:
        return 'border-main-light text-main-light';
      case SubmissionState.Rejected:
        return 'border-on-surface-disabled text-on-surface-disabled';
      default:
        return 'border-on-surface-disabled text-on-surface-disabled';
    }
  };

  return (
    <div
      className={`${color()} label-sm  whitespace-nowrap rounded-full border-2 first-letter:capitalize ${
        isSmall ? 'truncate p-1 text-center bt:p-2' : 'h-fit w-fit py-2 px-6'
      }`}
    >
      {status}
    </div>
  );
}
