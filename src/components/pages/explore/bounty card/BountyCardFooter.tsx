import { FullBounty } from '@/lib/types';
import { GetDateInString } from '@/lib/utils/DateHelpers';

export function BountyCardFooter({ bounty }: { bounty: FullBounty }) {
  return (
    <footer className="label-sm flex gap-4 text-on-surface-unactive">
      <span>{bounty.submissionsCount} subs</span>
      <span>
        {bounty.closesAt
          ? `Closes in ${GetDateInString(bounty.closesAt)}`
          : 'Never closes'}
      </span>
    </footer>
  );
}
