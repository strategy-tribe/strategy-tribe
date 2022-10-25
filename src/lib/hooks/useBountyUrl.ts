import { useRouter } from 'next/router';
import { useMemo } from 'react';

import { BountyUrl } from '@/lib/models/BountyUrl';
import { BountyView } from '@/lib/models/BountyView';

import { GoTo404Page } from '../utils/Routes';
import { useIsValidView } from './isValidUrl';

export const useBountyUrl = () => {
  useIsValidView(Object.values(BountyView), GoTo404Page());

  const router = useRouter();

  function buildRoute(qry: BountyUrl, url: string) {
    router.pathname = url;

    return {
      pathname: router.pathname,
      query: {
        view: qry.view,
      },
    };
  }

  const query: BountyUrl = useMemo(() => {
    const urlQuery = router.query;

    if (!urlQuery.view) {
      return { view: BountyView.Details };
    }

    const query: BountyUrl = {
      view: (urlQuery.view as string as BountyView) || BountyView.Submissions,
    };

    return query;
  }, [router.query]);

  return {
    setQuery: (qry: BountyUrl, url: string, options?: { scroll?: boolean }) => {
      const newRouter = buildRoute(qry, url);
      router.push(newRouter, undefined, { scroll: !!options?.scroll });
    },
    query,
  };
};
