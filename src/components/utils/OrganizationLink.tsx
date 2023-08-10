import Link from 'next/link';

import { useGetOrganization } from '@/lib/hooks/organizationHooks';
import { GoToBountyPage, GoToOrgPage } from '@/lib/utils/Routes';
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
  title,
  className = 'font-medium text-main-light w-fit hover:underline',
}: {
  bountyId: string;
  title: string;
  className?: string;
}) {
  return (
    <Link href={GoToBountyPage(bountyId)}>
      <span className={className}>{title}</span>
    </Link>
  );
}
