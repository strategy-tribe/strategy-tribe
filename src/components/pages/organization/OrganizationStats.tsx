import { Button, ButtonStyle } from '@/components/utils/Button';
import React, { useMemo } from 'react';
import { Section } from '../landing/Section';
import { Stat } from '../submission/Stat';
import { useOrganizationContext } from './OrganizationContext';

export function OrganizationStats({
  showDonations,
}: {
  showDonations: () => void;
}) {
  const { org, orgBounties } = useOrganizationContext();

  const totalFunds = useMemo(() => {
    let total = 0;
    orgBounties?.forEach((p) => (total += p.funds));
    return total + (org?.funds ? org?.funds : 0);
  }, [org, orgBounties]);

  return (
    <Section className="w-full flex gap-x-16 gap-y-8 flex-wrap">
      <Stat
        title="Total bounty on this organization"
        content={`${totalFunds} MATIC`}
      />

      <Stat title="Funds address" content={`${org?.wallet}`} copyable />

      <Button
        info={{
          label: 'Support bounties on this organization',
          style: ButtonStyle.Text,
          icon: 'toll',
          onClick: showDonations,
          className: 'w-fit',
          removeMinWidth: true,
          removePadding: true,
        }}
      />
    </Section>
  );
}
