import { useGetBounties } from '@/lib/hooks/bountyHooks';
import { BountyOrderBy } from '@/lib/models/BountyQueryParams';
import { Order } from '@/lib/models/Order';

import { useOrganizationContext } from './OrganizationContext';

const AMOUNT_OF_BOUNTIES = 9;

export function OrgBounties() {
  const { org } = useOrganizationContext();

  const { bounties, isLoading, count } = useGetBounties({
    order: Order.Desc,
    orderBy: BountyOrderBy.Bounty,
    amount: AMOUNT_OF_BOUNTIES,
    specificityOfOrgName: 'Exact',
    orgName: org.name,
  });

  const theresMore = (count ?? 0) > AMOUNT_OF_BOUNTIES;

  return <></>;

  // return (
  //   <div className="space-y-8">
  //     <AboutTitle text="Bounties" />

  //     <div className="grid grid-cols-3 gap-x-16 gap-y-10 -translate-x-1">
  //       {isLoading &&
  //         ArrayOfNumbers(9).map((n) => {
  //           return <DummyBountyCard key={n} />;
  //         })}
  //       {!isLoading &&
  //         bounties.map((b) => {
  //           return <BountyCard bounty={b} key={b.id} />;
  //         })}
  //     </div>

  //     {theresMore && !!count && (
  //       <Button
  //         info={{
  //           className: '-translate-x-2 w-fit',
  //           label: `${count - AMOUNT_OF_BOUNTIES} more`,
  //           style: ButtonStyle.TextPurple,
  //           icon: 'arrow_forward',
  //           removeMinWidth: true,
  //           removePadding: true,
  //           isALink: GoToOrgBountiesPage(org.id!),
  //         }}
  //       />
  //     )}
  //   </div>
  // );
}
