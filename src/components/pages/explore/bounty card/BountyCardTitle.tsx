import { SmallBounty } from '@/server/routes/bounties/getBounties';

export function BountyCardTitle({ bounty }: { bounty: SmallBounty }) {
  return (
    <h5 className="breakWord group-hover:text-on-surface-p0">{bounty.title}</h5>
  );
}
