import { useRouter } from 'next/router';

import { useGetBounty } from '@/lib/hooks/bountyHooks';
import { ParseBountyTitle } from '@/lib/utils/BountyHelpers';
import { GoToBountyPage } from '@/lib/utils/Routes';

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
      <span className="font-grotesk text-sm font-medium text-on-surface-unactive">
        {title}
      </span>
      <button
        className="w-fit text-left text-sm font-medium text-main-light hover:underline"
        onClick={() => router.push(GoToBountyPage(bountyId as string))}
      >
        {parsedTitle}
      </button>
    </div>
  );
}
