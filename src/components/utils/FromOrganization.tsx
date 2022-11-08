import React from 'react';

import { OrganizationLink } from './OrganizationLink';

export default function FromOrganization({
  orgId: orgId,
  title = ' Related to',
}: {
  orgId: string;
  title?: string;
}) {
  return (
    <div className="flex flex-col">
      <span className="label text-on-surface-unactive">{title}</span>
      <OrganizationLink orgId={orgId} />
    </div>
  );
}
