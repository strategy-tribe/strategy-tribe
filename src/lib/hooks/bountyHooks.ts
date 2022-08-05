import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useMoralis } from 'react-moralis';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import { BountyQueryParams } from '@/lib/models/queries/BountyQueryParams';
import { Requirement, RequirementType } from '@/lib/models/requirement';
import { Target } from '@/lib/models/target';
import {
  Moralis_useGetBounties,
  Moralis_useGetBounty,
  Moralis_useSaveBounty,
} from '@/lib/moralis/serverMethods/Moralis_Bounties';

import Queries from '@/utils/Queries';
import { GoToBountyPage } from '@/utils/Routes';

//!Get All
export const useGetBounties = (config: BountyQueryParams, enabled = true) => {
  const { isInitialized } = useMoralis();
  const page = config.page || 0;
  const { fetch } = Moralis_useGetBounties(config);

  const [numOfPages, setNumOfPages] = useState(0);

  const queryId = [Queries.AllBounties, config, config.page];

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
      keepPreviousData: config.paginate,
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    if (data && config.amount && config.paginate) {
      const { count } = data;
      const _numOfPages = Math.floor((count - 1) / config.amount + 1);

      setNumOfPages(_numOfPages);
    } else {
      setNumOfPages(0);
    }
  }, [data, config]);

  return {
    isLoading,
    bounties: data?.bounties || [],
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
export const useGetBounty = (
  id: string,
  enabled = true,
  options?: { addAttachment: boolean }
) => {
  const { fetch } = Moralis_useGetBounty(id);
  const { isInitialized } = useMoralis();

  const { data, isLoading, error } = useQuery(
    [Queries.OneBounty, id],
    () => fetch(),
    {
      enabled: isInitialized && enabled,
      select: (data) => {
        if (
          data?.requirements.find((r) => r.type === RequirementType.Image) ===
            undefined &&
          options?.addAttachment
        ) {
          data?.requirements.push({
            title: 'Attachments',
            type: RequirementType.Image,
            optional: true,
          });
        }
        return data;
      },
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
