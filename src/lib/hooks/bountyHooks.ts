import {
  Moralis_useGetBounty,
  Moralis_useGetBounties,
  Moralis_useSaveBounty,
} from '@/lib/moralis/serverMethods/Moralis_Bounties';
import { BountyQueryParams } from '@/lib/models/queries/BountyQueryParams';
import { GoToBountyPage } from '@/utils/Routes';
import { useRouter } from 'next/router';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import Queries from '@/utils/Queries';
import { Requirement } from '@/lib/models/requirement';
import { Target } from '@/lib/models/target';
import { useEffect, useState } from 'react';
import { useMoralis } from 'react-moralis';

//!Get All
export const useGetBounties = (query: BountyQueryParams, enabled = true) => {
  const { isInitialized } = useMoralis();
  const page = query.page || 0;
  const { fetch } = Moralis_useGetBounties(query);

  const [numOfPages, setNumOfPages] = useState(0);

  const queryId = [Queries.AllBounties, query, query.page];

  const { error, isLoading, data, isFetching, isPreviousData } = useQuery(
    queryId,
    () => fetch(),
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
      keepPreviousData: query.paginate,
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    if (data && query.amount && query.paginate) {
      const { count } = data;
      const _numOfPages = Math.round(count / query.amount);

      setNumOfPages(_numOfPages);
    } else {
      setNumOfPages(0);
    }
  }, [data]);

  return {
    isLoading,
    bounties: data?.bounties,
    isFetching,
    page,
    numOfPages,
    count: data?.count,
    hasNextPage: data?.hasMore,
    hasPreviousPage: data?.hasLess,
    isPreviousData,
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
