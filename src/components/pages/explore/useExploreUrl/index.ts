import { useRouter } from 'next/router';
import { useMemo } from 'react';

import { GoToBountiesPage } from '@/lib/utils/Routes';

import {
  BountiesFilter,
  BountiesFilterType,
  DEFAULT_FILTER,
  DEFAULT_FILTERS,
} from '@/components/pages/explore/filters/utils/DefaultFilter';

import { GetBountiesParams } from '@/server/routes/bounties/getBounties';

import { ParamsToQuery, QueryToParams } from './utilts';

/** Helper for the explore page */
export const useExploreUrl = () => {
  const router = useRouter();

  function buildRoute(
    searchParams: GetBountiesParams,
    url = GoToBountiesPage(),
    type?: BountiesFilterType
  ) {
    router.pathname = url;

    const filterType: BountiesFilterType =
      type ?? urlFilter.type ?? DEFAULT_FILTER.type;

    // const search = searchParams.search ?? urlFilter.query.search ?? undefined;

    // const page = searchParams.page ?? urlFilter.query.page ?? 0;

    // const relatedTo =
    //   searchParams.targetNames ?? urlFilter.query.targetNames ?? [];

    // const countries = searchParams.countries ?? urlFilter.query.countries ?? [];

    const routerQuery = {
      pathname: router.pathname,
      query: { ...ParamsToQuery(searchParams), filterType },
    };

    return routerQuery;
  }

  const urlFilter: BountiesFilter = useMemo(() => {
    const { filterType } = router.query;

    const predefinedFilter = DEFAULT_FILTERS.find((f) => f.type === filterType);

    if (predefinedFilter) {
      const customQuery = QueryToParams(router.query);
      const customFilter: BountiesFilter = {
        ...predefinedFilter,
        query: {
          ...predefinedFilter.query,
          ...customQuery,
        },
      };
      return customFilter;
    } else {
      return DEFAULT_FILTER;
    }
  }, [router.query]);

  return {
    setUrlFilter: (
      searchParams: GetBountiesParams,
      options?: { type?: BountiesFilterType; scroll?: boolean; url?: string }
    ) => {
      const newRouter = buildRoute(searchParams, options?.url, options?.type);
      router.push(newRouter, undefined, { scroll: !!options?.scroll });
    },
    urlFilter: urlFilter,
  };
};
