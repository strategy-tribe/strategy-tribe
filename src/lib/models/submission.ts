import { Requirement, RequirementType } from './requirement';
import { SubmissionState } from './status';

export type SubmissionContent = {
  requirement: Requirement;
  answer?: string | string[];
};

export type Submission = {
  bountyId: string;
  owner: string;
  answers: SubmissionContent[];
  state: SubmissionState;
  //
  id?: string;
  createdAt: Date;
  //
  review?: Review;
};

export type Review = {
  //set by server
  id?: string;
  createdAt: Date;
  //actual info
  grade: SubmissionState.Accepted | SubmissionState.NotAccepted;
  submissionId: string;
  reviewerId: string;
  reviewerComment?: string;
};
