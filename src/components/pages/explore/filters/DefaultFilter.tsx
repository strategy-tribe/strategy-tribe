import { QueryParams } from '@/lib/models';
import { Order, BountyOrderBy } from '@/lib/models/queryParams';

export type DefaultFilter = {
  type: string;
  query: QueryParams;
};

const LATEST_FILTER: DefaultFilter = {
  type: 'Latest',
  query: {
    order: Order.Asc,
    orderBy: BountyOrderBy.CreatedAt,
    amount: 16,
  },
};
const TOP_REWARDS_FILTER: DefaultFilter = {
  type: 'Rewards',
  query: {
    order: Order.Desc,
    orderBy: BountyOrderBy.Bounty,
    amount: 16,
  },
};
const LOW_COMPETITION_FILTER: DefaultFilter = {
  type: 'Low competition',
  query: {
    order: Order.Asc,
    orderBy: BountyOrderBy.Submissions,
    amount: 16,
  },
};
const CLOSES_SOON_FILTER: DefaultFilter = {
  type: 'Closes soon',
  query: {
    order: Order.Asc,
    orderBy: BountyOrderBy.ClosesAt,
    amount: 16,
  },
};
export const DEFAULT_FILTERS = [
  LATEST_FILTER,
  TOP_REWARDS_FILTER,
  LOW_COMPETITION_FILTER,
  CLOSES_SOON_FILTER,
];

export const DEFAULT_FILTER = LATEST_FILTER;
