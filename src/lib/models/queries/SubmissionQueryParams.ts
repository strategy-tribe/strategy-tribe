import { RequirementType } from '../requirement';
import { SubmissionState } from '../status';
import { Order } from './Order';

export interface SubmissionQueryParams {
  searchTerm?: string;
  paginate?: boolean;
  amount?: number;
  order: Order;
  //
  bountyId?: string;
  owner?: string;
  requirements?: RequirementType[];
  states?: SubmissionState[];
  reviewed?: boolean;
}
