import { BountyState, QueryParams } from '@/lib/models';
import { BountyOrderBy } from '@/lib/models/queries/BountyQueryParams';
import { Order } from '@/lib/models/queries/Order';

export enum DefaultFilterType {
  Latest = 'Latest',
  TopRewards = 'Top Rewards',
  LowCompetition = 'Low competition',
  ClosesSoon = 'Closes soon',
}

export type DefaultFilter = {
  type: DefaultFilterType;
  query: QueryParams;
};

const LATEST_FILTER: DefaultFilter = {
  type: DefaultFilterType.Latest,
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
  type: DefaultFilterType.TopRewards,

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
  type: DefaultFilterType.LowCompetition,

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
  type: DefaultFilterType.ClosesSoon,
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
  TOP_REWARDS_FILTER,
  LATEST_FILTER,
  LOW_COMPETITION_FILTER,
  CLOSES_SOON_FILTER,
];

export const DEFAULT_FILTER = TOP_REWARDS_FILTER;
