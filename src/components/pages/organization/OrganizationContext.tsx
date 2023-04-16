import { createContext, ReactNode, useContext } from 'react';

import { useGetBounties } from '@/lib/hooks/bountyHooks';
import { BountyOrderBy } from '@/lib/models/BountyQueryParams';
import { Order } from '@/lib/models/Order';
import { GoToBountyPage } from '@/lib/utils/Routes';

import { FullOrg } from '@/server/routes/organizations/getOrg';

import { useGetBounties } from '@/lib/hooks/bountyHooks';
import { BountyOrderBy } from '@/lib/models/BountyQueryParams';
import { Order } from '@/lib/models/Order';
import { OrgView } from './OrgView';
import { useOrgUrl } from './useOrgUrl';

interface iOrganizationContext {
  org: FullOrg;
  view: OrgView;
  bounties: any;
  isLoading: boolean;
  count: number;
  setView: (val: OrgView) => void;
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore`;
const OrganizationContext = createContext<iOrganizationContext>();

export const OrganizationContextProvider = ({
  children,
  org,
}: {
  children: ReactNode;
  org: FullOrg;
}) => {
  const { query, setQuery } = useOrgUrl();

  function setView(val: OrgView) {
    setQuery({ ...query, view: val }, GoToBountyPage(org?.name));
  }

  const { bounties, isLoading, count } = useGetBounties({
    order: Order.Desc,
    orderBy: BountyOrderBy.Bounty,
    // amount: AMOUNT_OF_BOUNTIES,
    orgName: [org.name],
  });

  return (
    <OrganizationContext.Provider
      value={{
        org: org,
        bounties: bounties,
        isLoading: isLoading,
        count: count,
        view: query.view,
        setView,
      }}
    >
      {children}
    </OrganizationContext.Provider>
  );
};

export const useOrganizationContext = () => {
  return useContext(OrganizationContext);
};
