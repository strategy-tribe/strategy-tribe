import { useAuth } from 'auth/AuthContext';
import { useRouter } from 'next/router';
import { useMemo } from 'react';

import { useIsValidView } from '@/lib/hooks/isValidUrl';
import { GoToAccountPage } from '@/lib/utils/Routes';

import { AccountUrl } from './AccountUrl';
import { AccountView, VIEWS_FOR_STAFF } from './AccountView';

export const useAccountUrl = () => {
  useIsValidView(Object.values(AccountView), GoToAccountPage());

  const router = useRouter();
  const { isAdmin, isStaff } = useAuth();

  function buildRoute(qry: AccountUrl, url: string) {
    router.pathname = url;

    return {
      pathname: router.pathname,
      query: {
        view: qry.view,
      },
    };
  }

  const query: AccountUrl = useMemo(() => {
    const urlQuery = router.query;
    const view = urlQuery?.view as string as AccountView;

    const filter = isAdmin || isStaff ? [] : VIEWS_FOR_STAFF;

    if (
      !urlQuery.view ||
      !Object.values(AccountView)
        .filter((v) => !filter.includes(v))
        .includes(view)
    ) {
      return { view: AccountView.Account };
    } else {
      const query: AccountUrl = {
        view,
      };

      return query;
    }
  }, [router, isAdmin, isStaff]);

  return {
    setQuery: (
      qry: AccountUrl,
      url: string,
      options?: { scroll?: boolean }
    ) => {
      const newRouter = buildRoute(qry, url);
      router.push(newRouter, undefined, { scroll: !!options?.scroll });
    },
    query,
  };
};
