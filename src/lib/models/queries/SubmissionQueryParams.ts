import { RequirementType } from '../requirement';
import { SubmissionState } from '../status';
import { Order } from './Order';

export interface SubmissionQueryParams {
  order: Order;
  page?: number;
  paginate?: boolean;
  amount?: number;
  searchTerm?: string;
  reviewed?: boolean;
  //
  bounties?: string[];
  owners?: string[];
  states?: SubmissionState[];
  requirements?: RequirementType[];
}
