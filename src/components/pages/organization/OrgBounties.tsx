import { ArrayOfNumbers } from '@/lib/utils/ArrayHelpers';

import { Button, ButtonStyle } from '@/components/utils/Button';
import { GoToOrgBountiesPage } from '@/lib/utils/Routes';
import { BountyCard, DummyBountyCard } from '../explore/bounty card/BountyCard';
import { useOrganizationContext } from './OrganizationContext';
import { AboutTitle } from './utils/AboutTitle';

const AMOUNT_OF_BOUNTIES = 9;

export function OrgBounties() {
  const { org, bounties, isLoading, count } = useOrganizationContext();
  const theresMore = (count ?? 0) > AMOUNT_OF_BOUNTIES;

  return (
    <div className="space-y-8">
      <AboutTitle text="Bounties" />

      <div className="grid -translate-x-1 grid-cols-3 gap-x-10 gap-y-10 tablet:gap-x-16">
        {isLoading &&
          ArrayOfNumbers(9).map((n) => {
            return <DummyBountyCard key={n} />;
          })}
        {!isLoading &&
          bounties.map((bounty: any) => {
            return <BountyCard bounty={bounty} key={bounty.slug} />;
          })}
      </div>

      {theresMore && !!count && (
        <Button
          info={{
            className: '-translate-x-2 w-fit',
            label: `${count - AMOUNT_OF_BOUNTIES} more`,
            style: ButtonStyle.TextPurple,
            icon: 'arrow_forward',
            removeMinWidth: true,
            removePadding: true,
            isALink: GoToOrgBountiesPage(org.name),
          }}
        />
      )}
    </div>
  );
}
