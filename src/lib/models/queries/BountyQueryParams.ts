import { BountyState } from '../status';
import { TargetType } from '../targetType';
import { Order } from './Order';

export interface BountyQueryParams {
  order: Order;
  orderBy: BountyOrderBy;
  searchTerm?: string;
  paginate?: boolean;
  amount?: number;
  states?: BountyState[];
  orgName?: string;
  specificityOfOrgName?: 'Exact' | 'Loose';
  specificityOfTitle?: 'Exact' | 'Loose';
  targetType?: TargetType;
  minBounty?: number;
  maxBounty?: number;
  countries?: string[];
  page?: number;
}

export enum BountyOrderBy {
  CreatedAt = 'createdAt',
  Bounty = 'funds',
  Submissions = 'submissions',
  ClosesAt = 'closesAt',
}
