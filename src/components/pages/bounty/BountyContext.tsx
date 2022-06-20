import { Bounty, BountyState } from '@/lib/models';

import { TargetType } from '@/lib/models/targetType';
import { useContext, createContext, ReactNode, useMemo, useState } from 'react';

type BountyPageTabs = 'details' | 'submissions' | 'FAQ';

interface iBountyContext {
  bounty: Bounty;
  sectionInView: BountyPageTabs;
  setSectionInView: (val: BountyPageTabs) => void;
}

const BountyContext = createContext<iBountyContext>({
  bounty: {
    name: '',
    organizationName: '',
    type: TargetType.Individual,
    state: BountyState.Closed,
    title: '',
    requirements: [],
    funds: 0,
    submissions: 0,
    wallet: '',
  },
  sectionInView: 'details',
  setSectionInView: () => {},
});

export const BountyContextProvider = ({
  children,
  bounty,
}: {
  children: ReactNode;
  bounty: Bounty;
}) => {
  const [sectionInView, setSectionInView] = useState<BountyPageTabs>('details');

  return (
    <BountyContext.Provider
      value={{
        bounty,
        sectionInView,
        setSectionInView,
      }}
    >
      {children}
    </BountyContext.Provider>
  );
};

export const useBountyContext = () => {
  return useContext(BountyContext);
};
