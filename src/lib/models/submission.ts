import { Requirement, RequirementType } from './requirement';
import { Review } from './Review';
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
