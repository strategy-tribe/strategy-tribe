import { SubmissionState } from './status';

export type Review = {
  id?: string;
  createdAt: Date;
  grade: SubmissionState.Accepted | SubmissionState.Rejected;
  submissionId: string;
  reviewerId: string;
  reviewerComment?: string;
};
