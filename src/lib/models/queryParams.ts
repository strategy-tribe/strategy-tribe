import { CountryData } from './map/CountryData';
import { Requirement, RequirementType } from './requirement';
import { BountyState, SubmissionState } from './status';
import { TargetType } from './targetType';

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

//!Bounties

export interface BountyQueryParams {
  searchTerm?: string;
  paginate?: boolean;
  amount?: number;
  orderBy: BountyOrderBy;
  order: Order;
  states?: BountyState[];
  orgName?: string;
  specificityOfOrgName?: 'Exact' | 'Loose';
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

export enum Order {
  Desc = 'desc',
  Asc = 'asc',
}
