import { Section } from '@/components/pages/landing/Section';

import { FullOrg } from '@/server/routes/organizations/getOrg';

import { useOrganizationContext } from './OrganizationContext';
import { OrgCountries } from './OrgCountries';
import { OrgStat } from './OrgStat';
import { OrgTags } from './OrgTags';
export function OrgHeader() {
  const { org } = useOrganizationContext();
  return (
    <div className="border-b-2 border-surface py-16">
      <Section className="items-center justify-between gap-8 tablet:flex">
        <div className="space-y-1">
          <OrgTags />
          <div className="space-y-2">
            <h1 className="capitalize">{org.name}test</h1>
            <OrgCountries />
          </div>
        </div>

        <div className="flex items-center gap-4 tablet:gap-8">
          <OrgStat
            value={org.targets
              ?.map((target) => target._count.bounties)
              ?.reduce((sum, count) => sum + count, 0)
              ?.toString()}
            label="Bounties"
          />
          <div className="h-10 w-0.5 bg-surface-dark" />
          <OrgStat value={`${getBalance(org)} MATIC`} label="In bounties" />
          <div className="h-10 w-0.5 bg-surface-dark" />

          {/* TODO: to be implemented - RED-98
          <SubToOrgButton
            orgId={org.id}
            button={(_, isSubscribed) => {
              return {
                removePadding: isSubscribed ?? true,
                style: isSubscribed ? ButtonStyle.Text : ButtonStyle.Filled,
              };
            }}
          /> */}
        </div>
      </Section>
    </div>
  );
}

function getBalance(org: FullOrg) {
  let totalBalance = org.wallet?.balance ?? 0;
  org.targets?.forEach((target) => {
    target.bounties.forEach((bounty) => {
      totalBalance = totalBalance + (bounty.wallet?.balance ?? 0);
    });
  });
  return totalBalance;
}
