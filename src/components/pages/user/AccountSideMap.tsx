import { GoToAccountPage } from '@/lib/utils/Routes';
import { AccountView } from '../../../lib/models/account/AccountView';
import { useAccountUrl } from '../../../lib/models/account/useAccountUrl';

export function AccountSideMap() {
  const { query, setQuery } = useAccountUrl();
  const pages = Object.entries(AccountView);

  function goToPage(view: AccountView) {
    const url = GoToAccountPage();
    setQuery({ view }, url);
  }

  return (
    <aside className="w-[240px] flex flex-col gap-2">
      {pages.map((pair, i) => {
        const label = pair[0];
        const value = pair[1];
        return (
          <button
            className={`${
              value === query.view ? 'bg-darker text-white' : 'hover:bg-darker'
            } rounded text-left pr-8 p-4 label`}
            key={i}
            onClick={() => goToPage(value as AccountView)}
          >
            {label}
          </button>
        );
      })}
    </aside>
  );
}
