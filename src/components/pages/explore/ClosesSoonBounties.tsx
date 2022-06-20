import {
  Order,
  BountyOrderBy,
  BountyQueryParams,
} from '@/lib/models/queryParams';
import { BountyList } from './BountiesList';

export const ClosesSoonBounties = () => {
  const PAGE_TITLE = 'Closes soon';
  const query: BountyQueryParams = {
    order: Order.Asc,
    orderBy: BountyOrderBy.ClosesAt,
    amount: 5,
  };

  return <BountyList title={PAGE_TITLE} query={query} />;
};
