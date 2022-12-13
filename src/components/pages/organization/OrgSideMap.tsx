import Link from 'next/link';

import { GoToOrgBountiesPage } from '@/lib/utils/Routes';

import { useOrganizationContext } from './OrganizationContext';
import { OrgView } from './OrgView';

export function OrgSideMap() {
  const { org } = useOrganizationContext();

  return (
    <aside className="flex shrink-0 items-center gap-2 pb-4 tablet:w-[160px] tablet:flex-col tablet:items-stretch">
      <button className="label rounded border-2 border-main p-4 pr-8 text-left capitalize text-on-surface-p0">
        {OrgView.About}
      </button>

      {org.id ? (
        <Link href={GoToOrgBountiesPage(org.name)}>
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
