import { useAuth } from '@/auth/AuthContext';

import { useAccountContext } from './AccountContext';
import { AccountSideMap } from './AccountSideMap';
import { AccountDetails } from './sections/AccountDetails';
import { AccountReviews } from './sections/AccountReviews';
import { AccountRewards } from './sections/AccountRewards';
import { AccountSubmissions } from './sections/AccountSubmissions';
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

      {/* TODO: to be implemented - RED-98
      {view === AccountView.Watching && (
        <>
          <AccountWatching />
        </>
      )} */}

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

      {/* TODO: to be implemented - RED-98
      {view === AccountView.Notifications && (
        <>
          <AccountNotifications />
        </>
      )} */}

      {view === AccountView.Reviews && (isAdmin || isStaff) && (
        <>
          <AccountReviews />
        </>
      )}
    </Section>
  );
}
