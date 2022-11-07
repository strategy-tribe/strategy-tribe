import { FullBounty } from '@/lib/types';
import { BountyContent } from './BountyContent';
import { BountyContextProvider } from './BountyContext';
import { BountyHeader } from './BountyHeader';

export const Bounty = ({ bounty }: { bounty: FullBounty }) => {
  return (
    <BountyContextProvider bounty={bounty}>
      <div className="space-y-8">
        <BountyHeader />
        <BountyContent />
      </div>
    </BountyContextProvider>
  );
};
