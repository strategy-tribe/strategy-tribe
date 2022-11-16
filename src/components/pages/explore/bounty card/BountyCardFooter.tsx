import { GetDateInString } from '@/lib/utils/DateHelpers';

export function BountyCardFooter({
  amountOfSubs,
  closesAt,
}: {
  amountOfSubs: number;
  closesAt: Date | undefined;
}) {
  return (
    <footer className="label-sm flex gap-4 text-on-surface-unactive">
      <span>{amountOfSubs} subs</span>
      <span>
        {closesAt ? `Closes in ${GetDateInString(closesAt)}` : 'Never closes'}
      </span>
    </footer>
  );
}
