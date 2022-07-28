import { Section } from '@/components/pages/landing/Section';
import { SubToOrgButton } from '@/components/subscriptions/SubscribeToOrgButton';
import { ButtonStyle } from '@/components/utils/Button';

import { useOrganizationContext } from './OrganizationContext';
import { OrgCountries } from './OrgCountries';
import { OrgStat } from './OrgStat';
import { OrgTags } from './OrgTags';

export function OrgHeader() {
  const { org } = useOrganizationContext();
  return (
    <div className="py-16 border-y-2 border-surface">
      <Section className="flex justify-between items-center gap-8">
        <div className="space-y-1">
          <OrgTags />
          <div className="space-y-2">
            <h1 className="capitalize">{org.name}</h1>
            <OrgCountries />
          </div>
        </div>

        <div className="flex gap-8 items-center">
          <OrgStat value={org.bounties.toString()} label="Bounties" />
          <div className="bg-surface-dark w-0.5 h-10" />
          <OrgStat value={`${org.funds} MATIC`} label="In bounties" />
          <div className="bg-surface-dark w-0.5 h-10" />
          <SubToOrgButton
            orgName={org.name}
            button={(_, isSubscribed) => {
              return {
                removePadding: isSubscribed ?? true,
                style: isSubscribed ? ButtonStyle.Text : ButtonStyle.Filled,
              };
            }}
          />
        </div>
      </Section>
    </div>
  );
}
