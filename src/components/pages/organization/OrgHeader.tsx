import { Organization as OrganizationData } from '@/lib/models/organizations/organization';
import { Section } from '@/components/pages/landing/Section';

import { OrgTags } from './OrgTags';
import { OrgStat } from './OrgStat';
import { OrgCountries } from './OrgCountries';
import { useOrganizationContext } from './OrganizationContext';

export function OrgHeader() {
  const { org } = useOrganizationContext();
  return (
    <div className="bg-darker py-6">
      <Section className="flex justify-between items-center gap-8">
        <div>
          <OrgTags />
          <h1 className="capitalize h4">{org.name}</h1>
          <OrgCountries />
        </div>

        <div className="flex gap-8 items-center">
          <OrgStat value={org.bounties.toString()} label="Bounties" />
          <div className="bg-dark w-0.5 h-10" />
          <OrgStat value={`${org.funds} MATIC`} label="In bounties" />
        </div>
      </Section>
    </div>
  );
}
