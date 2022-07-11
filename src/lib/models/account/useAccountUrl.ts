import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { AccountView } from './AccountView';
import { AccountUrl } from './AccountUrl';

export const useAccountUrl = () => {
  const router = useRouter();

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

    if (!urlQuery.view) {
      return { view: AccountView.Account };
    }

    const query: AccountUrl = {
      view: (urlQuery.view as string as AccountView) || AccountView.Account,
    };

    return query;
  }, [router.query]);

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
