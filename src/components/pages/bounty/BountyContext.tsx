import { useBountyUrl } from '@/lib/hooks/useBountyUrl';
import { BountyView } from '@/lib/models/BountyView';
import { FullBounty } from '@/lib/types';
import { GoToBountyPage } from '@/lib/utils/Routes';
import { createContext, ReactNode, useContext } from 'react';


interface iBountyContext {
  bounty: FullBounty;
  view: BountyView;
  setView: (val: BountyView) => void;
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
const BountyContext = createContext<iBountyContext>();

export const BountyContextProvider = ({
  children,
  bounty,
}: {
  children: ReactNode;
  bounty: FullBounty;
}) => {
  const { query, setQuery } = useBountyUrl();

  function setView(val: BountyView) {
    setQuery({ ...query, view: val }, GoToBountyPage(bounty.slug));
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
