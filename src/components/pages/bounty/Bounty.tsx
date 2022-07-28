import { Bounty as BountyData } from '@/lib/models';

import { BountyContent } from './BountyContent';
import { BountyContextProvider } from './BountyContext';
import { BountyHeader } from './BountyHeader';

export const Bounty = ({ bounty }: { bounty: BountyData }) => {
  return (
    <BountyContextProvider bounty={bounty}>
      <div className="space-y-8">
        <BountyHeader />
        <BountyContent />
      </div>
    </BountyContextProvider>
  );
};
