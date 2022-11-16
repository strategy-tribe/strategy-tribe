import { ParseBountyTitle } from '@/lib/utils/BountyHelpers';

import { SmallBounty } from '@/server/routes/bounties/getBounties';

export function BountyCardTitle({ bounty }: { bounty: SmallBounty }) {
  const parsedTitle = ParseBountyTitle(bounty);

  return <h5 className="group-hover:text-on-surface-p0">{parsedTitle}</h5>;
}
