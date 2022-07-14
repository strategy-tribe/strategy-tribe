import { BountyState, QueryParams } from '@/lib/models';
import { BountyOrderBy } from '@/lib/models/queries/BountyQueryParams';
import { Order } from '@/lib/models/queries/Order';

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
    paginate: true,
    page: 0,
    states: [BountyState.Open],
  },
};
const TOP_REWARDS_FILTER: DefaultFilter = {
  type: 'Top Rewards',
  query: {
    order: Order.Desc,
    orderBy: BountyOrderBy.Bounty,
    amount: 16,
    paginate: true,
    page: 0,
    states: [BountyState.Open],
  },
};
const LOW_COMPETITION_FILTER: DefaultFilter = {
  type: 'Low competition',
  query: {
    order: Order.Asc,
    orderBy: BountyOrderBy.Submissions,
    amount: 16,
    paginate: true,
    page: 0,
    states: [BountyState.Open],
  },
};
const CLOSES_SOON_FILTER: DefaultFilter = {
  type: 'Closes soon',
  query: {
    order: Order.Asc,
    orderBy: BountyOrderBy.ClosesAt,
    amount: 16,
    paginate: true,
    page: 0,
    states: [BountyState.Open],
  },
};
export const DEFAULT_FILTERS = [
  LATEST_FILTER,
  TOP_REWARDS_FILTER,
  LOW_COMPETITION_FILTER,
  CLOSES_SOON_FILTER,
];

export const DEFAULT_FILTER = LATEST_FILTER;
