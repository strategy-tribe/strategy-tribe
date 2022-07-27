import React from 'react';
import { GetDateInString } from '@/lib/utils/DateHelpers';
import { Bounty } from '@/lib/models';

export function BountyCardFooter({ bounty }: { bounty: Bounty }) {
  return (
    <footer className="label-sm flex gap-4 text-on-surface-unactive">
      <span>{bounty.submissions} subs</span>
      <span>
        {bounty.closesAt
          ? `Closes in ${GetDateInString(bounty.closesAt)}`
          : 'Never closes'}
      </span>
    </footer>
  );
}
