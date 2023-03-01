import ProgressLoader from './utils/ProgressLoader';
import { useExploreContext } from '../ExploreContext';

export default function SubmissionStates() {
  const { submissionStatesData } = useExploreContext();
  const width = '100';
  const acceptedSubmissionWidth = (
    (submissionStatesData?.acceptedSubmissions / submissionStatesData?.total) *
    100
  ).toFixed(2);
  const rejectedSubmissionWidth = (
    (submissionStatesData?.rejectedSubmissions / submissionStatesData?.total) *
    100
  ).toFixed(2);
  const waitingForReviewSubmissionWidth = (
    (submissionStatesData?.waitingForReviewSubmissions /
      submissionStatesData?.total) *
    100
  ).toFixed(2);
  if (!submissionStatesData) return <></>;
  return (
    <div className="flex w-full flex-col rounded-md border px-6 pt-4">
      <span>Submissions</span>
      <div className="mt-4 w-full pb-2 text-xs">
        <span>Total Submissions</span>
        <div className="flex w-full flex-row pt-1">
          <div className="flex w-3/4">
            <ProgressLoader style={width} />
          </div>
          <div className="flex w-1/4 justify-center">
            <span>{submissionStatesData?.total}</span>
          </div>
        </div>
      </div>
      <div className="w-full pb-2 text-xs">
        <span>Accepted</span>
        <div className="flex w-full flex-row pt-1">
          <div className="flex w-3/4">
            <ProgressLoader style={acceptedSubmissionWidth} />
          </div>
          <div className="flex w-1/4 justify-center	">
            <span>{submissionStatesData?.acceptedSubmissions}</span>
          </div>
        </div>
      </div>
      <div className="w-full pb-2 text-xs">
        <span>Rejected</span>
        <div className="flex w-full flex-row pt-1">
          <div className="flex w-3/4">
            <ProgressLoader style={rejectedSubmissionWidth} />
          </div>
          <div className="flex w-1/4 justify-center	">
            <span>{submissionStatesData?.rejectedSubmissions}</span>
          </div>
        </div>
      </div>
      <div className="w-full pb-4 text-xs">
        <span>Waiting For Review</span>
        <div className="flex w-full flex-row pt-1">
          <div className="flex w-3/4">
            <ProgressLoader style={waitingForReviewSubmissionWidth} />
          </div>
          <div className="flex w-1/4 justify-center	">
            <span>{submissionStatesData?.waitingForReviewSubmissions}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
