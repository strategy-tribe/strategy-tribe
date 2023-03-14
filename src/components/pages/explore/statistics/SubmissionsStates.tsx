import { useExploreContext } from '../ExploreContext';
import ProgressLoader from './utils/ProgressLoader';

export default function SubmissionStates() {
  const { submissionStatesData } = useExploreContext();
  const width = '100';
  const acceptedSubmissionWidth = (
    ((submissionStatesData?.acceptedSubmissions ?? 0) /
      (submissionStatesData?.total ?? 0)) *
    100
  ).toFixed(2);
  const rejectedSubmissionWidth = (
    ((submissionStatesData?.rejectedSubmissions ?? 0) /
      (submissionStatesData?.total ?? 0)) *
    100
  ).toFixed(2);
  const waitingForReviewSubmissionWidth = (
    ((submissionStatesData?.waitingForReviewSubmissions ?? 0) /
      (submissionStatesData?.total ?? 0)) *
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
            <span>{submissionStatesData?.total ?? 0}</span>
          </div>
        </div>
      </div>
      <div className="w-full pb-2 text-xs">
        <span>Accepted</span>
        <div className="flex w-full flex-row pt-1">
          <div className="flex w-3/4">
            <ProgressLoader style={acceptedSubmissionWidth ?? 0} />
          </div>
          <div className="flex w-1/4 justify-center	">
            <span>{submissionStatesData?.acceptedSubmissions ?? 0}</span>
          </div>
        </div>
      </div>
      <div className="w-full pb-2 text-xs">
        <span>Rejected</span>
        <div className="flex w-full flex-row pt-1">
          <div className="flex w-3/4">
            <ProgressLoader style={rejectedSubmissionWidth ?? 0} />
          </div>
          <div className="flex w-1/4 justify-center	">
            <span>{submissionStatesData?.rejectedSubmissions ?? 0}</span>
          </div>
        </div>
      </div>
      <div className="w-full pb-4 text-xs">
        <span>Waiting For Review</span>
        <div className="flex w-full flex-row pt-1">
          <div className="flex w-3/4">
            <ProgressLoader style={waitingForReviewSubmissionWidth ?? 0} />
          </div>
          <div className="flex w-1/4 justify-center	">
            <span>
              {submissionStatesData?.waitingForReviewSubmissions ?? 0}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
