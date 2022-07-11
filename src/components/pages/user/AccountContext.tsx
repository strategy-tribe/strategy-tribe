import { GoToAccountPage } from '@/lib/utils/Routes';
import { useContext, createContext, ReactNode, useMemo, useState } from 'react';
import { Query } from 'react-query';
import { useAccountUrl } from '../../../lib/models/account/useAccountUrl';
import { AccountView } from '../../../lib/models/account/AccountView';

interface iAccountContext {
  view: AccountView;
  setView: (newView: AccountView) => void;
}

//@ts-ignore
const AccountContext = createContext<iAccountContext>();

export const AccountContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { query, setQuery } = useAccountUrl();

  function setView(val: AccountView) {
    setQuery({ ...query, view: val }, GoToAccountPage());
  }

  return (
    <AccountContext.Provider value={{ view: query.view, setView }}>
      {children}
    </AccountContext.Provider>
  );
};

export const useAccountContext = () => {
  return useContext(AccountContext);
};
