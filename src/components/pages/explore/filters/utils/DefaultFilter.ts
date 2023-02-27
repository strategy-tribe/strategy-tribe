import { BountyState } from '@prisma/client';

import { BountyOrderBy } from '@/lib/models/BountyQueryParams';
import { Order } from '@/lib/models/Order';

import { GetBountiesParams } from '@/server/routes/bounties/getBounties';

export enum BountiesFilterType {
  // eslint-disable-next-line no-unused-vars
  Latest = 'Latest',
  // eslint-disable-next-line no-unused-vars
  TopRewards = 'Top Rewards',
  // eslint-disable-next-line no-unused-vars
  LowCompetition = 'Low competition',
  // eslint-disable-next-line no-unused-vars
  ClosesSoon = 'Closes soon',
  Fingerprint = 'Fingerprint',
}

export type BountiesFilter = {
  type: BountiesFilterType;
  query: GetBountiesParams;
};

const LATEST_FILTER: BountiesFilter = {
  type: BountiesFilterType.Latest,
  query: {
    order: Order.Desc,
    orderBy: BountyOrderBy.CreatedAt,
    amount: 16,
    page: 0,
  },
};
const TOP_REWARDS_FILTER: BountiesFilter = {
  type: BountiesFilterType.TopRewards,

  query: {
    order: Order.Desc,
    orderBy: BountyOrderBy.Bounty,
    amount: 16,

    page: 0,
  },
};
const LOW_COMPETITION_FILTER: BountiesFilter = {
  type: BountiesFilterType.LowCompetition,

  query: {
    order: Order.Asc,
    orderBy: BountyOrderBy.Submissions,
    amount: 16,

    page: 0,
  },
};
const CLOSES_SOON_FILTER: BountiesFilter = {
  type: BountiesFilterType.ClosesSoon,
  query: {
    order: Order.Asc,
    orderBy: BountyOrderBy.ClosesAt,
    amount: 16,

    page: 0,
  },
};

export const FINGERPRINTS_FILTER: BountiesFilter = {
  type: BountiesFilterType.Fingerprint,

  query: {
    order: Order.Desc,
    orderBy: BountyOrderBy.Fingerprint,
    amount: 16,

    page: 0,
  },
};

export const DEFAULT_FILTERS = [
  TOP_REWARDS_FILTER,
  LATEST_FILTER,
  LOW_COMPETITION_FILTER,
  CLOSES_SOON_FILTER,
];

export const DEFAULT_FILTER = {
  ...LATEST_FILTER,
  query: { ...LATEST_FILTER.query, states: [BountyState.Open] },
};
