import { BountyTabs } from './BountyTabs';
import { StartSubmissionButton } from './StartSubmissionButton';
import { BountySubmissions } from './BountySubmissions';
import { FAQ } from './FAQ';
import Navbar from '@/components/navbar/Navbar';
import { ButtonInformation, ButtonStyle } from '@/components/utils/Button';
import { ImportantMessage } from '@/components/utils/Warning';
import { useCanUserSubmit } from '@/lib/hooks/submissionHooks';
import { Bounty as BountyData, BountyState } from '@/lib/models';
import { GoToBeforeNewSubmissionPage } from '@/lib/utils/Routes';
import { useAuth } from 'auth/AuthContext';
import router from 'next/router';
import { useMemo } from 'react';
import { BountyDetails } from '../../utils/BountyDetails';

import { BountyContextProvider } from './BountyContext';

export const Bounty = ({ bounty }: { bounty: BountyData }) => {
  //*User info
  const { userId: user, isStaff, LogIn } = useAuth();

  const { canSubmit } = useCanUserSubmit(
    user as string,
    bounty?.id as string,
    Boolean(user as string) && Boolean(bounty?.id)
  );

  const ctaButton: ButtonInformation | undefined = useMemo(() => {
    if (!user)
      return {
        label: 'Connect wallet',
        icon: 'loging',
        iconClasses: 'laptop:hidden',
        onClick: () => LogIn(),
        style: ButtonStyle.Hollow,
      };
    else if (isStaff) return;
    else {
      const bountyId = bounty.id as string;
      if (canSubmit)
        return {
          icon: 'publish',
          label: 'Submit findings',
          onClick: () => router.push(GoToBeforeNewSubmissionPage(bountyId)),
          style: ButtonStyle.Filled,
        };
    }
  }, [user, isStaff, bounty, canSubmit]);

  return (
    <BountyContextProvider bounty={bounty}>
      <Navbar
        setUp={{
          useBackArrow: true,
          leftLabel: bounty ? bounty.title : 'Loading...',
          useOverflowMenu: true,
          rightButtonInfo: ctaButton ? [ctaButton] : undefined,
        }}
      >
        <div className="flex flex-col gap-16 laptop:gap-8 mx-auto max-w-5xl">
          <BountyTabs />

          {bounty.state === BountyState.WaitingForFunds && (
            <ImportantMessage
              message="This bounty is waiting for funds"
              className="w-full"
            />
          )}

          {!user && (
            <ImportantMessage
              message="Join the hunt and start earning the rewards of bounties like this one."
              className="w-full"
              icon="stars"
              content={
                <button onClick={LogIn} className="mt-4 label underline">
                  <span>You only need your wallet</span>
                </button>
              }
            />
          )}

          {/* Bounty details */}
          <BountyDetails />

          {!!user && !isStaff && <StartSubmissionButton />}

          {/* Submissions */}
          <BountySubmissions />

          <FAQ />
        </div>
      </Navbar>
    </BountyContextProvider>
  );
};
