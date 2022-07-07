import { useGetBounties } from '@/lib/hooks/bountyHooks';
import { useUrlSearchParams } from '@/lib/hooks/useUrlSearchParams';
import { Bounty } from '@/lib/models';
import { Organization } from '@/lib/models/organizations/organization';
import {
  BountyQueryParams,
  Order,
  BountyOrderBy,
} from '@/lib/models/queryParams';
import { TargetType } from '@/lib/models/targetType';
import { useContext, createContext, ReactNode, useMemo, useState } from 'react';

interface iOrganizationContext {
  org: Organization;
  viewing: TargetType;
  setViewing: (val: TargetType) => void;
  orgBounties: Bounty[] | undefined;
  amountOfBounties: number | undefined;
  isLoadingBounties: boolean | undefined;
  goToMoreBounties: () => void;
}

const OrganizationContext = createContext<iOrganizationContext>({
  org: { name: '', funds: 0, bounties: 0, wallet: '' },
  amountOfBounties: 0,
  goToMoreBounties: () => undefined,
  isLoadingBounties: false,
  orgBounties: [],
  setViewing: () => {},
  viewing: TargetType.Organization,
});

export const OrganizationContextProvider = ({
  children,
  org,
}: {
  children: ReactNode;
  org: Organization;
}) => {
  const [viewing, setViewing] = useState<TargetType>(TargetType.Organization);

  const query: BountyQueryParams = useMemo(() => {
    return {
      order: Order.Desc,
      orderBy: BountyOrderBy.Bounty,
      paginate: true,
      amount: 10,
      orgName: org?.name || '',
      specificityOfOrgName: 'Exact',
      targetType: viewing,
    };
  }, [org, viewing]);

  const {
    isLoading: isLoadingBounties,
    bounties: orgBounties,
    count: amountOfBounties,
  } = useGetBounties(query, undefined, !!org);

  const { setQuery: go } = useUrlSearchParams();

  return (
    <OrganizationContext.Provider
      value={{
        org,
        viewing,
        setViewing,
        orgBounties,
        isLoadingBounties,
        amountOfBounties,
        goToMoreBounties: () => go(query),
      }}
    >
      {children}
    </OrganizationContext.Provider>
  );
};

export const useOrganizationContext = () => {
  return useContext(OrganizationContext);
};
