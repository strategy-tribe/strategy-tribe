import { Bounty } from '@/lib/models';

import { ParseBountyTitle } from '../../../../lib/utils/BountyHelpers';

export function BountyCardTitle({ bounty }: { bounty: Bounty }) {
  const parsedTitle = ParseBountyTitle(bounty);

  return <h5 className="group-hover:text-on-surface-p0">{parsedTitle}</h5>;
}
