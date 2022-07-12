import { SubmissionState } from '@/lib/models';

export function SubmissionStatus({ status }: { status: SubmissionState }) {
  const color = () => {
    switch (status) {
      case SubmissionState.WaitingForReview:
        return 'border-yellowDark text-yellowDark';
      case SubmissionState.Accepted:
        return 'border-purpleLight text-purpleLight';
      case SubmissionState.WaitingForPayment:
        return 'border-greenDark text-greenDark';
      case SubmissionState.Rejected:
        return 'border-disabled text-disabled';
      default:
        return 'border-disabled text-disabled';
    }
  };

  return (
    <div
      className={`${color()} border-2 rounded-full py-2 px-6 first-letter:capitalize label-sm w-fit`}
    >
      {status}
    </div>
  );
}
