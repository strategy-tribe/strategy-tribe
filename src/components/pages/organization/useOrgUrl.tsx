import { useRouter } from 'next/router';
import { useMemo } from 'react';

import { OrgUrl } from './OrgUrl';
import { OrgView } from './OrgView';

export const useOrgUrl = () => {
  const router = useRouter();

  function buildRoute(qry: OrgUrl, url: string) {
    router.pathname = url;

    return {
      pathname: router.pathname,
      query: {
        view: qry.view,
      },
    };
  }

  const query: OrgUrl = useMemo(() => {
    const urlQuery = router.query;

    if (!urlQuery.view) {
      return { view: OrgView.About };
    }

    const query: OrgUrl = {
      view: (urlQuery.view as string as OrgView) || OrgView.About,
    };

    return query;
  }, [router.query]);

  return {
    setQuery: (qry: OrgUrl, url: string, options?: { scroll?: boolean }) => {
      const newRouter = buildRoute(qry, url);
      router.push(newRouter, undefined, { scroll: !!options?.scroll });
    },
    query,
  };
};
