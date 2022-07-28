import { createContext, ReactNode, useContext } from 'react';

import { useBountyUrl } from '@/lib/hooks/useBountyUrl';
import { Bounty, BountyState } from '@/lib/models';
import { BountyView } from '@/lib/models/bounty/BountyView';
import { TargetType } from '@/lib/models/targetType';
import { GoToBountyPage } from '@/lib/utils/Routes';

interface iBountyContext {
  bounty: Bounty;
  view: BountyView;
  setView: (val: BountyView) => void;
}

const BountyContext = createContext<iBountyContext>({
  bounty: {
    id: '',
    name: '',
    title: '',
    wallet: '',
    type: TargetType.Individual,
    organizationName: '',
    state: BountyState.Closed,
    funds: 0,
    requirements: [],
    submissions: 0,
  },
  view: BountyView.Submissions,
  setView: () => {
    return;
  },
});

export const BountyContextProvider = ({
  children,
  bounty,
}: {
  children: ReactNode;
  bounty: Bounty;
}) => {
  const { query, setQuery } = useBountyUrl();

  function setView(val: BountyView) {
    setQuery({ ...query, view: val }, GoToBountyPage(bounty.id));
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
