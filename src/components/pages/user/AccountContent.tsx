import { Section } from '../landing/Section';
import { useAccountContext } from './AccountContext';
import { AccountView } from '../../../lib/models/account/AccountView';
import { AccountDetails } from './sections/AccountDetails';
import { AccountSideMap } from './AccountSideMap';
import { AccountSubmissions } from './sections/AccountSubmissions';
import { AccountWatching } from './sections/AccountWatching';
import { AccountRewards } from './sections/AccountRewards';
import { AccountNotifications } from './sections/AccountNotifications';

export function AccountContent() {
  const { view } = useAccountContext();

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
    </Section>
  );
}
