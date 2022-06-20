import { TargetType } from '@/lib/models/targetType';
import {
  Order,
  BountyOrderBy,
  BountyQueryParams,
} from '@/lib/models/queryParams';
import { BountyList } from './BountiesList';

export const TopOrgBounties = () => {
  const PAGE_TITLE = 'Top bounties for organizations';
  const query: BountyQueryParams = {
    order: Order.Desc,
    orderBy: BountyOrderBy.Bounty,
    targetType: TargetType.Organization,
    amount: 5,
  };

  return <BountyList title={PAGE_TITLE} query={query} fullSize={false} />;
};
