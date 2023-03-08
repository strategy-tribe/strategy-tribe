import { useEffect } from 'react';

import { useConnectToBounty } from '@/lib/hooks/fingerprintHooks';
import { getBrowserFingerprint } from '@/lib/utils/BrowserFingerprint';

import { useAuth } from '@/auth/AuthContext';
import { FullBounty } from '@/server/routes/bounties/getBounty';

import { BountyContent } from './BountyContent';
import { BountyContextProvider } from './BountyContext';
import { BountyHeader } from './BountyHeader';

export default function Bounty({ bounty }: { bounty: FullBounty }) {
  const { Connect } = useConnectToBounty();
  const { account, isFetchingUserInfo } = useAuth();

  useEffect(() => {
    if (!isFetchingUserInfo) {
      connectFingerprint();
    }
  }, [isFetchingUserInfo]);

  const connectFingerprint = async () => {
    const fp = await getBrowserFingerprint();
    Connect({
      slug: bounty.slug,
      fingerprint: fp.visitorId,
      account,
    });
  };

  return (
    <BountyContextProvider bounty={bounty}>
      <div className="space-y-8 px-4">
        <BountyHeader />
        <BountyContent />
      </div>
    </BountyContextProvider>
  );
}
