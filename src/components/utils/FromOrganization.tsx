import { useGetOrganization } from '@/hooks/organizationHooks';
import { useRouter } from 'next/router';
import React from 'react';
import { OrganizationLink } from './OrganizationLink';

export default function FromOrganization({
  orgName: orgName,
  title = ' Related to',
}: {
  orgName: string;
  title?: string;
}) {
  return (
    <div className={`flex flex-col`}>
      <span className="text-unactive label">{title}</span>
      <OrganizationLink orgName={orgName} />
    </div>
  );
}
