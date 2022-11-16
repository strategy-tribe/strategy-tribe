import { BountyState, TargetType } from '@prisma/client';

import { Order } from './Order';

type OrgName = string;

export interface BountyQueryParams {
  order: Order;
  orderBy?: BountyOrderBy;
  searchTerm?: string;
  paginate?: boolean;
  amount?: number;
  states?: BountyState[];
  orgId?: string;
  relatedTo?: OrgName[];
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
