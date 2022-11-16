import { createContext, ReactNode, useContext } from 'react';

import { GoToBountyPage } from '@/lib/utils/Routes';

import { FullOrg } from '@/server/routes/organizations/getOrg';

import { OrgView } from './OrgView';
import { useOrgUrl } from './useOrgUrl';

interface iOrganizationContext {
  org: FullOrg;
  view: OrgView;
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
