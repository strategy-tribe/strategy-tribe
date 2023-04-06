import { toPercentage } from '@/lib/utils/statisticsHelpers';

import { useExploreContext } from '../ExploreContext';
import ProgressLoader from './utils/ProgressLoader';

export default function SubmissionStates() {
  const { submissionStatesData } = useExploreContext();
  const total = submissionStatesData?.total ?? 0;
  const width = total ? '100' : '0';
  const acceptedSubmissionWidth = toPercentage(
    submissionStatesData?.acceptedSubmissions ?? 0,
    total
  );
  const rejectedSubmissionWidth = toPercentage(
    submissionStatesData?.rejectedSubmissions ?? 0,
    total
  );
  const waitingForReviewSubmissionWidth = toPercentage(
    submissionStatesData?.waitingForReviewSubmissions ?? 0,
    total
  );
  if (!submissionStatesData) return <></>;
  return (
    <div className="mt-4 flex w-full flex-col rounded-md border px-6 py-6">
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
      {/* TODO: add back when needed
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
      </div> */}
    </div>
  );
}
