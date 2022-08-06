import { useAuth } from 'auth/AuthContext';

import { AccountView } from '../../../lib/models/account/AccountView';
import { Section } from '../landing/Section';
import { useAccountContext } from './AccountContext';
import { AccountSideMap } from './AccountSideMap';
import { AccountDetails } from './sections/AccountDetails';
import { AccountNotifications } from './sections/AccountNotifications';
import { AccountReviews } from './sections/AccountReviews';
import { AccountRewards } from './sections/AccountRewards';
import { AccountSubmissions } from './sections/AccountSubmissions';
import { AccountWatching } from './sections/AccountWatching';

export function AccountContent() {
  const { view } = useAccountContext();

  const { isAdmin, isStaff } = useAuth();

  return (
    <Section className="flex gap-24 min-h-[20rem]">
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

      {view === AccountView.Submissions && (
        <>
          <AccountSubmissions />
        </>
      )}

      {view === AccountView.Rewards && (
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
    </Section>
  );
}
