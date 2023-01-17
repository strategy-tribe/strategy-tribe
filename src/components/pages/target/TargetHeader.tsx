import { Section } from '@/components/pages/landing/Section';

import { FullTarget } from '@/server/routes/targets/getTarget';

import { useTargetContext } from './TargetContext';
import { TargetCountries } from './TargetCountries';
import { TargetTags } from './TargetTags';
import { OrgStat } from '../organization/OrgStat';

export function TargetHeader() {
  const { target } = useTargetContext();
  return (
    <div className="border-b-2 border-main py-16">
      <Section className="items-center justify-between gap-8 tablet:flex">
        <div className="space-y-1">
          <TargetTags />
          <div className="space-y-2">
            <h1 className="capitalize">{target.name}</h1>
            <TargetCountries />
          </div>
        </div>

        <div className="flex items-center gap-4 tablet:gap-8">
          <OrgStat value={target._count.bounties.toString()} label="Bounties" />
          <div className="h-10 w-0.5 bg-surface-dark" />
          <OrgStat value={`${getBalance(target)} MATIC`} label="In bounties" />
          <div className="h-10 w-0.5 bg-surface-dark" />

          {/* TODO: to be implemented - RED-98
          <SubToTargetButton
            targetId={target.id}
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

function getBalance(target: FullTarget) {
  let totalBalance = 0;
  target.bounties.forEach((bounty) => {
    totalBalance = totalBalance + (bounty.wallet?.balance ?? 0);
  });
  return totalBalance;
}
