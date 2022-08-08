import { useRouter } from 'next/router';

import { useGetBounty } from '@/hooks/bountyHooks';
import { ParseBountyTitle } from '@/lib/utils/BountyHelpers';

import { GoToBountyPage } from '@/utils/Routes';

export default function FromBounty({
  bountyId,
  title = ' From bounty',
}: {
  bountyId: string;
  title?: string;
}) {
  const { isLoading, bounty } = useGetBounty(bountyId);

  const router = useRouter();

  if (isLoading || !bounty) return <span>Loading...</span>;

  const parsedTitle = ParseBountyTitle(bounty);

  return (
    <div className="flex flex-col">
      <span className="text-on-surface-unactive font-grotesk text-sm font-medium">
        {title}
      </span>
      <button
        className="text-main-light text-sm font-medium w-fit hover:underline text-left"
        onClick={() => router.push(GoToBountyPage(bountyId as string))}
      >
        {parsedTitle}
      </button>
    </div>
  );
}
