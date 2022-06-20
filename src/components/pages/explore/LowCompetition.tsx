import {
  Order,
  BountyOrderBy,
  BountyQueryParams,
} from '@/lib/models/queryParams';
import { BountyList } from './BountiesList';

export const LowCompetitionBounties = () => {
  const PAGE_TITLE = 'Low competition';
  const query: BountyQueryParams = {
    order: Order.Asc,
    orderBy: BountyOrderBy.Submissions,
    amount: 5,
  };

  return <BountyList title={PAGE_TITLE} query={query} />;
};
