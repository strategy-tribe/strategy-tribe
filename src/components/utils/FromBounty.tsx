import { useRouter } from 'next/router';

import { useGetBounty } from '@/lib/hooks/bountyHooks';
import { GoToBountyPage } from '@/lib/utils/Routes';

export default function FromBounty({
  slug,
  title = ' From bounty',
}: {
  slug: string;
  title?: string;
}) {
  const { isLoading, bounty } = useGetBounty(slug);

  const router = useRouter();

  if (isLoading || !bounty) return <span>Loading...</span>;

  return (
    <div className="flex flex-col">
      <span className="font-grotesk text-sm font-medium text-on-surface-unactive">
        {title}
      </span>
      <button
        className="w-fit text-left text-sm font-medium text-main-light hover:underline"
        onClick={() => router.push(GoToBountyPage(slug as string))}
      >
        {bounty.title}
      </button>
    </div>
  );
}
