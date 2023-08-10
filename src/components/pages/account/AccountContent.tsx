import { useAuth } from '@/auth/AuthContext';

import { useAccountContext } from './AccountContext';
import { AccountSideMap } from './AccountSideMap';
import { AccountDetails } from './sections/AccountDetails';
import { AccountNotifications } from './sections/AccountNotifications';
import { AccountReferrals } from './sections/AccountReferrals';
import { AccountReviews } from './sections/AccountReviews';
import { AccountRewards } from './sections/AccountRewards';
import { AccountSubmissions } from './sections/AccountSubmissions';
import { AccountWatching } from './sections/AccountWatching';
import { Section } from '../landing/Section';
import { AccountView } from '../../../lib/models/AccountView';

export function AccountContent() {
  const { view } = useAccountContext();

  const { isAdmin, isStaff } = useAuth();

  return (
    <Section className="min-h-[20rem] gap-12 tablet:flex tablet:gap-24">
      <AccountSideMap />

      {view === AccountView.Account && (
        <>
          <AccountDetails />
        </>
      )}

      {view === AccountView.Watching && (
        <>
          <AccountWatching />
        </>
      )}

      {view === AccountView.Submissions && !(isAdmin || isStaff) && (
        <>
          <AccountSubmissions />
        </>
      )}

      {view === AccountView.Rewards && !(isAdmin || isStaff) && (
        <>
          <AccountRewards />
        </>
      )}

      {view === AccountView.Notifications && (
        <>
          <AccountNotifications />
        </>
      )}

      {view === AccountView.Reviews && (isAdmin || isStaff) && (
        <>
          <AccountReviews />
        </>
      )}

      {view === AccountView.Referrals && (
        <>
          <AccountReferrals />
        </>
      )}
    </Section>
  );
}
