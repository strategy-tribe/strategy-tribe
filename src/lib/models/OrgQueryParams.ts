import { BountyState, TargetType } from '@prisma/client';

import { Order } from './Order';

export interface BountyQueryParams {
  order: Order;
  searchTerm?: string;
  paginate?: boolean;
  amount?: number;
  states?: BountyState[];
  orgs?: string[];
  specificityOfOrgName?: 'Exact' | 'Loose';
  specificityOfTitle?: 'Exact' | 'Loose';
  targetType?: TargetType;
  minBounty?: number;
  maxBounty?: number;
  countries?: string[];
  page?: number;
}
