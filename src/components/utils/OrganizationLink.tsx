import { useGetOrganizationByName } from '@/hooks/organizationHooks';
import { GoToOrgPage } from '@/utils/Routes';
import Link from 'next/link';
import React from 'react';

export function OrganizationLink({
  orgName,
  className = 'text-purpleLight font-medium w-fit hover:underline',
}: {
  orgName: string;
  className?: string;
}) {
  const { organization } = useGetOrganizationByName(orgName);

  return (
    <Link href={GoToOrgPage(organization?.id ? organization.id : '')}>
      <a className={className}>{orgName}</a>
    </Link>
  );
}
