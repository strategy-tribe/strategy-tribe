import { BountyState } from '@prisma/client';

import { GetDateInString } from '@/lib/utils/DateHelpers';

export function BountyCardFooter({
  amountOfSubs,
  closesAt,
  status,
}: {
  amountOfSubs: number;
  closesAt: Date | undefined;
  status: BountyState;
}) {
  return (
    <footer className="label-sm flex gap-4 text-on-surface-unactive">
      <span>{amountOfSubs} subs</span>
      <span>
        {status === BountyState.Closed
          ? 'Closed'
          : closesAt
          ? `Closes in ${GetDateInString(closesAt)}`
          : 'Never closes'}
      </span>
    </footer>
  );
}
