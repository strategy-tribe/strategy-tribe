import { useAuth } from '@/auth/AuthContext';
import { FullBounty } from '@/server/routes/bounties/getBounty';

import { BountyContent } from './BountyContent';
import { BountyContextProvider } from './BountyContext';
import { BountyHeader } from './BountyHeader';

export default function Bounty({ bounty }: { bounty: FullBounty }) {
  const { account, isFetchingUserInfo } = useAuth();

  return (
    <BountyContextProvider bounty={bounty}>
      <div className="space-y-8 px-4">
        <BountyHeader />
        <BountyContent />
      </div>
    </BountyContextProvider>
  );
}
