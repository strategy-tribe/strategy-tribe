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
      <Section className="flex items-center justify-between gap-8">
        <div className="space-y-1">
          <OrgTags />
          <div className="space-y-2">
            <h1 className="capitalize">{org.name}</h1>
            <OrgCountries />
          </div>
        </div>

        <div className="flex items-center gap-8">
          <OrgStat value={org.targets?.map((target:any) => target._count.bounties)?.reduce((sum: any, count: any) => sum + count, 0)?.toString()} label="Bounties" />
          <div className="bg-surface-dark w-0.5 h-10" />
          <OrgStat value={`${org.wallet?.balance ?? 0} MATIC`} label="In bounties" />
          <div className="bg-surface-dark w-0.5 h-10" />
          <SubToOrgButton
            orgId={org.id}
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
