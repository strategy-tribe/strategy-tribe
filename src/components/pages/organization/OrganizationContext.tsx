import { Organization } from '@/lib/models/organizations/organization';

import { GoToBountyPage } from '@/lib/utils/Routes';
import { useContext, createContext, ReactNode } from 'react';
import { OrgView } from './OrgView';
import { useOrgUrl } from './useOrgUrl';

interface iOrganizationContext {
  org: Organization;
  view: OrgView;
  setView: (val: OrgView) => void;
}

//@ts-ignore
const OrganizationContext = createContext<iOrganizationContext>();

export const OrganizationContextProvider = ({
  children,
  org,
}: {
  children: ReactNode;
  org: Organization;
}) => {
  const { query, setQuery } = useOrgUrl();

  function setView(val: OrgView) {
    setQuery({ ...query, view: val }, GoToBountyPage(org.id!));
  }

  return (
    <OrganizationContext.Provider
      value={{
        org: org,
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
