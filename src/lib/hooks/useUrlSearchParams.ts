import { useRouter } from 'next/router';
import { useMemo } from 'react';

import { GoToBountiesPage } from '@/lib/utils/Routes';

import {
  BountiesFilter,
  BountiesFilterType,
  DEFAULT_FILTER,
  DEFAULT_FILTERS,
} from '@/components/pages/explore/filters/DefaultFilter';

import { GetBountiesParams } from '@/server/routes/bounties/getBounties';

export const useUrlSearchParams = () => {
  const router = useRouter();

  function buildRoute(
    searchParams: GetBountiesParams,
    url = GoToBountiesPage(),
    type?: BountiesFilterType
  ) {
    router.pathname = url;

    const filterType: BountiesFilterType =
      type ?? urlFilter.type ?? DEFAULT_FILTER.type;

    const search = searchParams.search ?? urlFilter.query.search ?? undefined;

    const page = searchParams.page ?? urlFilter.query.page ?? 0;

    const relatedTo =
      searchParams.targetNames ?? urlFilter.query.targetNames ?? [];

    const countries = searchParams.countries ?? urlFilter.query.countries ?? [];

    const routerQuery = {
      pathname: router.pathname,
      query: {
        search,
        type: filterType,
        page,
        relatedTo,
        countries,
      },
    };

    return routerQuery;
  }

  const urlFilter: BountiesFilter = useMemo(() => {
    const { search, type, page, relatedTo, countries } = router.query;

    const urlFilter = DEFAULT_FILTERS.find((f) => f.type === type);

    if (urlFilter) {
      const customFilter: BountiesFilter = {
        ...urlFilter,
        query: {
          ...urlFilter.query,
          page: parseInt(page as string) ?? 0,
          search: (search as string) ?? undefined,
          targetNames: (relatedTo as string[]) ?? undefined,
          countries: (countries as string)
            ? [countries as string]
            : (countries as string[]) ?? [],
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
