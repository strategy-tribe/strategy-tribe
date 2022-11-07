import { createContext, ReactNode, useContext } from 'react';

import { GoToAccountPage } from '@/lib/utils/Routes';

import { AccountView } from '../../../lib/models/AccountView';
import { useAccountUrl } from '../../../lib/models/useAccountUrl';

interface iAccountContext {
  view: AccountView;
  setView: (newView: AccountView) => void;
}

const AccountContext = createContext<iAccountContext>({
  view: AccountView.Notifications,
  setView: () => {
    return;
  },
});

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
