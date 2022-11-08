import Link from 'next/link';

import { GoToOrgBountiesPage } from '@/lib/utils/Routes';

import { useOrganizationContext } from './OrganizationContext';
import { OrgView } from './OrgView';

export function OrgSideMap() {
  const { org } = useOrganizationContext();

  return (
    <aside className="flex w-[160px] shrink-0 flex-col gap-2">
      <button className="label rounded border-2 border-main p-4 pr-8 text-left capitalize text-on-surface-p0">
        {OrgView.About}
      </button>

      {org.id ? (
        <Link href={GoToOrgBountiesPage(org.id)}>
          <span className="label rounded p-4 pr-8 text-left capitalize hover:bg-surface-dark">
            All bounties
          </span>
        </Link>
      ) : (
        <></>
      )}
    </aside>
  );
}
