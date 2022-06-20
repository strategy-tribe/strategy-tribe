import {
  Order,
  BountyOrderBy,
  BountyQueryParams,
} from '@/lib/models/queryParams';
import { BountyList } from './BountiesList';

export const LatestBounties = () => {
  const PAGE_TITLE = 'Latest Bounties';
  const query: BountyQueryParams = {
    order: Order.Asc,
    orderBy: BountyOrderBy.CreatedAt,
    amount: 15,
  };

  return <BountyList title={PAGE_TITLE} query={query} />;
};
