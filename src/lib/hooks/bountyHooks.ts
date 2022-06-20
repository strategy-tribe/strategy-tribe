import {
  Moralis_useGetBounty,
  Moralis_useGetBounties,
  Moralis_useSaveBounty,
} from '@/lib/moralis/serverMethods/Moralis_Bounties';
import { BountyQueryParams } from '@/lib/models/queryParams';
import { GoToBountyPage } from '@/utils/Routes';
import { useRouter } from 'next/router';
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from 'react-query';
import Queries from '@/utils/Queries';
import { Bounty } from '@/lib/models/bounty';
import { Requirement } from '@/lib/models/requirement';
import { Target } from '@/lib/models/target';
import { useEffect, useState } from 'react';
import { useMoralis } from 'react-moralis';

//!Get All
export const useGetBounties = (
  config: BountyQueryParams,
  initialPage = 10,
  enabled = true
) => {
  const { isInitialized } = useMoralis();
  const { fetch } = Moralis_useGetBounties(config);

  const [numOfPages, setNumOfPages] = useState(0);
  const [currPage, setCurrPage] = useState(initialPage);

  const queryId = [Queries.AllBounties, config, currPage];

  const { error, isLoading, data, isFetching, isPreviousData } = useQuery(
    queryId,
    () => fetch(currPage),
    {
      getPreviousPageParam: (lastPackage) => {
        const { hasLess, page } = lastPackage;
        if (hasLess) return page - 1;
        else return false;
      },
      getNextPageParam: (lastPackage) => {
        const { hasMore, page } = lastPackage;
        if (hasMore) return page + 1;
        else return false;
      },
      enabled: isInitialized && enabled,
      keepPreviousData: config.paginate,
    }
  );

  useEffect(() => {
    setCurrPage(0);
  }, [config]);

  useEffect(() => {
    if (data && config.amount && config.paginate) {
      const { count, page } = data;
      const _numOfPages = Math.round(count / config.amount);

      setNumOfPages(_numOfPages);
      setCurrPage(page);
    } else {
      setNumOfPages(0);
    }
  }, [data]);

  return {
    isLoading,
    bounties: data?.bounties,
    isFetching,
    currPage,
    numOfPages,
    count: data?.count,
    fetchNextPage: () => setCurrPage(currPage + 1),
    fetchPreviousPage: () => setCurrPage(currPage - 1),
    goToPage: (pageNum: number) => setCurrPage(pageNum),
    hasNextPage: data?.hasMore,
    hasPreviousPage: data?.hasLess,
    isPreviousData,
    error,
  };
};

export const useGetBounties_Infinite = (
  config: BountyQueryParams,
  enabled = true
) => {
  const { fetch } = Moralis_useGetBounties(config);

  const {
    error,
    isLoading,
    data,
    isFetching,
    isPreviousData,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
  } = useInfiniteQuery(
    [Queries.AllBounties, config],
    ({ pageParam = 1 }) => fetch(pageParam),
    {
      getPreviousPageParam: (lastPackage) => {
        const { hasLess, page } = lastPackage;
        if (hasLess) return page - 1;
        else return false;
      },
      getNextPageParam: (lastPackage) => {
        const { hasMore, page } = lastPackage;
        if (hasMore) return page + 1;
        else return false;
      },
      enabled,
      keepPreviousData: config.paginate,
    }
  );

  let bounties: Bounty[] = [];
  data?.pages.forEach((d) => {
    bounties = [...bounties, ...d.bounties];
  });

  return {
    isLoading,
    bounties,
    isFetching,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
    isPreviousData,
    count: data?.pages.at(0)?.count,
    error,
  };
};

//!Get one
export const useGetBounty = (id: string, enabled = true) => {
  const { fetch } = Moralis_useGetBounty(id);
  const { isInitialized } = useMoralis();

  const { data, isLoading, error } = useQuery(
    [Queries.OneBounty, id],
    () => fetch(),
    {
      enabled: isInitialized && enabled,
    }
  );

  return { bounty: data, isLoading, error };
};

//!Put one
export const useSaveBounty = (
  title: string,
  target: Target,
  requirements: Requirement[],
  staffCreatorId: string,
  closesAt?: Date
) => {
  const q = useQueryClient();
  const router = useRouter();

  const { save } = Moralis_useSaveBounty(
    title,
    target,
    requirements,
    staffCreatorId,
    closesAt
  );

  const { mutate, isLoading, error } = useMutation(() => save(), {
    onSuccess: (bountyId) => {
      router.push(GoToBountyPage(bountyId));
      q.invalidateQueries();
    },
  });

  return {
    Save: mutate,
    isLoading,
    error,
  };
};
