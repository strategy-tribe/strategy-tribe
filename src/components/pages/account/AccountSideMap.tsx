import { useAuth } from 'auth/AuthContext';
import { useMemo } from 'react';

import { AccountView, VIEWS_FOR_STAFF } from '@/lib/models/account/AccountView';
import { useAccountUrl } from '@/lib/models/account/useAccountUrl';
import { GoToAccountPage } from '@/lib/utils/Routes';

export function AccountSideMap() {
  const { isAdmin, isStaff } = useAuth();
  const { query, setQuery } = useAccountUrl();
  const pages = useMemo(() => {
    const _pages = Object.entries(AccountView);

    const filter = isAdmin || isStaff ? [] : VIEWS_FOR_STAFF;
    return _pages.filter((p) => !filter.includes(p[1]));
  }, [isAdmin, isStaff]);

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
              value === query.view
                ? 'border-main text-on-surface-p0'
                : 'border-bg hover:bg-surface-dark'
            } rounded text-left pr-8 p-4 label border-2`}
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
