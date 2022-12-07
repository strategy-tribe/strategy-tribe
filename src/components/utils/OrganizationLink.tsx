import Link from 'next/link';

import { useGetOrganization } from '@/lib/hooks/organizationHooks';
import { GoToOrgPage } from '@/lib/utils/Routes';

export function OrganizationLink({
  orgName,
  className = 'font-medium text-main-light w-fit hover:underline',
}: {
  orgName: string;
  className?: string;
}) {
  const { organization, isLoading } = useGetOrganization({ name: orgName });

  if (isLoading)
    return (
      <div className="mt-1 h-4 w-60 animate-pulse rounded-sm bg-surface" />
    );

  return (
    <Link href={GoToOrgPage(organization?.name ?? '')}>
      <span className={`${className} capitalize`}>{organization?.name}</span>
    </Link>
  );
}

export function BountyLink({
  bountyId: bountyId,
  className = 'font-medium text-main-light w-fit hover:underline',
}: {
  bountyId: string;
  className?: string;
}) {
  // const { bounty } = useGetBounty(bountyId);

  return <></>;

  // return (
  //   <Link href={GoToBountyPage(bounty.id)}>
  //     <span className={className}>{bountyId}</span>
  //   </Link>
  // );
}
