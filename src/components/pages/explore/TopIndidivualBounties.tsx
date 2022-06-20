import { BountyList } from './BountiesList';
import {
  Order,
  BountyOrderBy,
  BountyQueryParams,
} from '@/lib/models/queryParams';

import { TargetType } from '@/lib/models/targetType';

export const TopIndidivualBounties = () => {
  const PAGE_TITLE = 'Top bounties for individuals';
  const query: BountyQueryParams = {
    order: Order.Desc,
    orderBy: BountyOrderBy.Bounty,
    targetType: TargetType.Individual,
    amount: 5,
  };

  return <BountyList title={PAGE_TITLE} query={query} fullSize={false} />;
};
