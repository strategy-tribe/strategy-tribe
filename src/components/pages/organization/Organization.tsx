import { FullOrganization } from '@/lib/types';

import { OrganizationContextProvider } from './OrganizationContext';
import { OrgContent } from './OrgContent';
import { OrgHeader } from './OrgHeader';

export function Organization({ org }: { org: FullOrganization }) {
  return (
    <OrganizationContextProvider org={org}>
      <div className="space-y-8">
        <OrgHeader />
        <OrgContent />
      </div>
    </OrganizationContextProvider>
  );
}
