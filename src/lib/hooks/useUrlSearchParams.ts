import { useRouter } from 'next/router';
import { useMemo } from 'react';

import {
  DEFAULT_FILTER,
  DEFAULT_FILTERS,
  DefaultFilter,
  DefaultFilterType,
} from '@/components/pages/explore/filters/DefaultFilter';

import { GoToBountiesPage } from '@/utils/Routes';

type UrlParams = {
  type?: DefaultFilterType;
  search?: string;
  page?: number;
  relatedTo?: string[];
  countries?: string[];
};

export const useUrlSearchParams = () => {
  const router = useRouter();

  function buildRoute(
    searchParams: UrlParams,
    url = GoToBountiesPage(),
    reset = false
  ) {
    router.pathname = url;

    if (reset) {
      return {
        pathname: router.pathname,
        query: {
          type: DEFAULT_FILTER.type,
          search: undefined,
          page: 0,
          relatedTo: [],
          countries: [],
        },
      };
    } else {
      const type = searchParams.type ?? urlFilter.type ?? DEFAULT_FILTER.type;

      const search =
        searchParams.search ?? urlFilter.query.searchTerm ?? undefined;

      const page = searchParams.page ?? urlFilter.query.page ?? 0;

      const relatedTo =
        searchParams.relatedTo ?? urlFilter.query.relatedTo ?? [];

      const countries =
        searchParams.countries ?? urlFilter.query.countries ?? [];

      const routerQuery = {
        pathname: router.pathname,
        query: {
          search,
          type,
          page,
          relatedTo,
          countries,
        },
      };

      return routerQuery;
    }
  }

  const urlFilter: DefaultFilter = useMemo(() => {
    const { search, type, page, relatedTo, countries } = router.query;

    const urlFilter = DEFAULT_FILTERS.find((f) => f.type === type);

    if (urlFilter) {
      const customFilter: DefaultFilter = {
        ...urlFilter,
        query: {
          ...urlFilter.query,
          page: parseInt(page as string) ?? 0,
          searchTerm: (search as string) ?? undefined,
          relatedTo: (relatedTo as string[]) ?? undefined,
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
      searchParams: UrlParams,
      options?: { scroll?: boolean; url?: string; reset?: boolean }
    ) => {
      const newRouter = buildRoute(searchParams, options?.url, options?.reset);
      router.push(newRouter, undefined, { scroll: !!options?.scroll });
    },
    urlFilter: urlFilter,
  };
};
