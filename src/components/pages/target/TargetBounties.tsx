import { useGetBounties } from '@/lib/hooks/bountyHooks';
import { BountyOrderBy } from '@/lib/models/BountyQueryParams';
import { Order } from '@/lib/models/Order';
import { ArrayOfNumbers } from '@/lib/utils/ArrayHelpers';

import { useTargetContext } from './TargetContext';
import { BountyCard, DummyBountyCard } from '../explore/bounty card/BountyCard';
import { AboutTitle } from '../organization/utils/AboutTitle';

export function TargetBounties() {
  const { target } = useTargetContext();

  const { bounties, isLoading, count } = useGetBounties({
    order: Order.Desc,
    orderBy: BountyOrderBy.Bounty,
    targetNames: [target.name],
  });

  return (
    <div className="space-y-8">
      <AboutTitle text={`Bounties (${count})`} />

      <div className="grid -translate-x-1 grid-cols-3 gap-x-10 gap-y-10 tablet:gap-x-16">
        {isLoading &&
          ArrayOfNumbers(9).map((n) => {
            return <DummyBountyCard key={n} />;
          })}
        {!isLoading &&
          bounties.map((b) => {
            return <BountyCard bounty={b} key={b.slug} />;
          })}
      </div>
    </div>
  );
}
