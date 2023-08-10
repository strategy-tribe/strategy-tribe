import { useMemo } from 'react';

import {
  AccountView,
  VIEWS_FOR_STAFF,
  VIEWS_FOR_USER,
} from '@/lib/models/AccountView';
import { useAccountUrl } from '@/lib/models/useAccountUrl';
import { GoToAccountPage } from '@/lib/utils/Routes';

import { useAuth } from '@/auth/AuthContext';

export function AccountSideMap() {
  const { isAdmin, isStaff } = useAuth();
  const { query, setQuery } = useAccountUrl();
  const pages = useMemo(() => {
    const _pages = Object.entries(AccountView);

    const filter = isAdmin || isStaff ? VIEWS_FOR_USER : VIEWS_FOR_STAFF;
    return _pages.filter((p) => !filter.includes(p[1]));
  }, [isAdmin, isStaff]);

  function goToPage(view: AccountView) {
    const url = GoToAccountPage();
    setQuery({ view }, url);
  }

  return (
    <aside className="mb-2 flex flex-wrap justify-around gap-1 border-b-2 pb-2 tablet:w-[240px] tablet:flex-col tablet:justify-start tablet:gap-2 tablet:border-b-0">
      {pages.map((pair, i) => {
        const label = pair[0];
        const value = pair[1];
        return (
          <button
            className={`${
              value === query.view
                ? 'border-main text-on-surface-p0'
                : 'border-bg hover:bg-surface-dark'
            } label rounded border-2 p-2 text-center tablet:p-4 tablet:pr-8 tablet:text-left`}
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
