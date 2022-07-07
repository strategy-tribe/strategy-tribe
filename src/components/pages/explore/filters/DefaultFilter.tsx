import { QueryParams } from '@/lib/models';
import { Order, BountyOrderBy } from '@/lib/models/queryParams';

export type DefaultFilter = {
  type: string;
  query: QueryParams;
};
const latest: DefaultFilter = {
  type: 'Latest',
  query: {
    order: Order.Asc,
    orderBy: BountyOrderBy.CreatedAt,
    amount: 16,
  },
};
const topRewards: DefaultFilter = {
  type: 'Rewards',
  query: {
    order: Order.Desc,
    orderBy: BountyOrderBy.Bounty,
    amount: 16,
  },
};
const lowCompetition: DefaultFilter = {
  type: 'Low competition',
  query: {
    order: Order.Asc,
    orderBy: BountyOrderBy.Submissions,
    amount: 16,
  },
};
const closesSoon: DefaultFilter = {
  type: 'Closes soon',
  query: {
    order: Order.Asc,
    orderBy: BountyOrderBy.ClosesAt,
    amount: 16,
  },
};
export const DEFAULT_FILTERS = [latest, topRewards, lowCompetition, closesSoon];
