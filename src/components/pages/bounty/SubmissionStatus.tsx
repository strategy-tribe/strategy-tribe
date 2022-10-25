import { SubmissionState } from '@prisma/client';

export function SubmissionStateDisplayer({
  status,
}: {
  status: SubmissionState;
}) {
  const color = () => {
    switch (status) {
      case SubmissionState.WaitingForReview:
        return 'border-waiting text-waiting';
      case SubmissionState.Accepted:
        return 'border-main-light text-main-light';
      case SubmissionState.WaitingForPayment:
        return 'border-success text-success';
      case SubmissionState.Rejected:
        return 'border-on-surface-disabled text-on-surface-disabled';
      default:
        return 'border-on-surface-disabled text-on-surface-disabled';
    }
  };

  return (
    <div
      className={`${color()} h-fit border-2 rounded-full py-2 px-6 first-letter:capitalize label-sm w-fit whitespace-nowrap`}
    >
      {status}
    </div>
  );
}
