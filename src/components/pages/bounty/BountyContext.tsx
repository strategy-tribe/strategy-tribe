import { useBountyUrl } from '@/lib/hooks/useBountyUrl';
import { Bounty } from '@/lib/models';
import { BountyView } from '@/lib/models/bounty/BountyPage';

import { GoToBountyPage } from '@/lib/utils/Routes';
import { useContext, createContext, ReactNode } from 'react';

interface iBountyContext {
  bounty: Bounty;
  view: BountyView;
  setView: (val: BountyView) => void;
}

//@ts-ignore
const BountyContext = createContext<iBountyContext>();

export const BountyContextProvider = ({
  children,
  bounty,
}: {
  children: ReactNode;
  bounty: Bounty;
}) => {
  const { query, setQuery } = useBountyUrl();

  function setView(val: BountyView) {
    setQuery({ ...query, view: val }, GoToBountyPage(bounty.id!));
  }

  return (
    <BountyContext.Provider
      value={{
        bounty,
        view: query.view,
        setView,
      }}
    >
      {children}
    </BountyContext.Provider>
  );
};

export const useBountyContext = () => {
  return useContext(BountyContext);
};
