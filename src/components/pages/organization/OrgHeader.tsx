import { Section } from '@/components/pages/landing/Section';

import { OrgTags } from './OrgTags';
import { OrgStat } from './OrgStat';
import { OrgCountries } from './OrgCountries';
import { useOrganizationContext } from './OrganizationContext';
import { SubToOrgButton } from '@/components/subscriptions/SubscribeToOrgButton';
import { ButtonStyle } from '@/components/utils/Button';

export function OrgHeader() {
  const { org } = useOrganizationContext();
  return (
    <div className="bg-darker py-6">
      <Section className="flex justify-between items-center gap-8">
        <div className="space-y-1">
          <OrgTags />
          <div className="space-y-2">
            <h1 className="capitalize h4">{org.name}</h1>
            <OrgCountries />
          </div>
        </div>

        <div className="flex gap-8 items-center">
          <OrgStat value={org.bounties.toString()} label="Bounties" />
          <div className="bg-dark w-0.5 h-10" />
          <OrgStat value={`${org.funds} MATIC`} label="In bounties" />
          <div className="bg-dark w-0.5 h-10" />
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
