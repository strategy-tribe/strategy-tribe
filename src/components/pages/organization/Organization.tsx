import { FullOrg } from '@/server/routes/organizations/getOrg';

import { OrganizationContextProvider } from './OrganizationContext';
import { OrgContent } from './OrgContent';
import { OrgHeader } from './OrgHeader';

export function Organization({ org }: { org: FullOrg }) {
  return (
    <OrganizationContextProvider org={org}>
      <div className="space-y-8">
        <OrgHeader />
        <OrgContent />
      </div>
    </OrganizationContextProvider>
  );
}
