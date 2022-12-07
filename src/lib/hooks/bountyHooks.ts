import { useEffect, useState } from 'react';

import { trpc } from '@/lib/trpc';

import {
  GetBountiesParams,
  SmallBounty,
} from '@/server/routes/bounties/getBounties';

//!Get All
export const useGetBounties = (config: GetBountiesParams, enabled = true) => {
  const page = config.page || 0;

  // console.log(config);

  const [numOfPages, setNumOfPages] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);

  const { error, isLoading, data, isFetching } =
    trpc.bounty.getBounties.useQuery(config, {
      enabled: enabled,
    });

  const count = data?.count;

  useEffect(() => {
    if (data && count && config.amount) {
      const _numOfPages = Math.floor((count - 1) / config.amount + 1);
      setHasNextPage(_numOfPages - 1 > (config?.page ?? _numOfPages));
      setHasPreviousPage((config?.page ?? 0) != 0);
      setNumOfPages(_numOfPages);
    } else {
      setNumOfPages(0);
    }
  }, [data, config, count]);

  const bounties: SmallBounty[] = data?.bounties ?? [];

  return {
    isLoading,
    bounties,
    isFetching: isFetching,
    page,
    numOfPages,
    count: count ?? 10,
    hasNextPage,
    hasPreviousPage,
    isPreviousData: false,
    error,
  };
};

//!Get one
export const useGetBounty = (slug: string, enabled = true) => {
  const { error, isLoading, data } = trpc.bounty.getBounty.useQuery(
    {
      slug,
    },
    { enabled }
  );

  return {
    bounty: data?.bounty ?? undefined,
    error,
    isLoading,
  };
};
