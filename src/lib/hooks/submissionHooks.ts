import { useEffect, useState } from 'react';
import { useMoralis } from 'react-moralis';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import { SubmissionQueryParams } from '@/lib/models/queries/SubmissionQueryParams';
import {
  Molaris_useSaveSubmission,
  Moralis_canSubmit,
  Moralis_submitterInfo,
  Moralis_useGetSubmission,
  Moralis_useGetSubmissions,
  Moralis_useGetSubmissionsFromBounty,
  Moralis_useGetUserSubmissions,
} from '@/lib/moralis/serverMethods/Moralis_Submissions';

import { UserInput } from '@/components/pages/submission/new submission/UserInput';

import Queries from '@/utils/Queries';

export const useSaveSubmission = (
  owner: string,
  content: UserInput[],
  bountyId: string,
  events: {
    onMutate: () => void;
    onSuccess: (id?: string) => void;
    onError: (e: any) => void;
  }
) => {
  const { onError, onMutate, onSuccess } = events;

  const q = useQueryClient();

  const { save } = Molaris_useSaveSubmission(owner, content, bountyId);

  const { mutate, isLoading, isSuccess, error } = useMutation(() => save(), {
    onMutate,
    onError,
    onSuccess: (submissionId) => {
      q.invalidateQueries();
      onSuccess(submissionId);
    },
  });

  return {
    Save: mutate,
    isLoading,
    isSuccess,
    error,
  };
};

export const useGetSubmission = (id: string, enabled = true, retries = 1) => {
  const { find } = Moralis_useGetSubmission(id);

  const {
    data: submission,
    isLoading,
    error,
  } = useQuery([Queries.OneSubmision, id], () => find(), {
    enabled,
    retry: retries,
  });

  return { submission, isLoading, error };
};

export const useGetSubmissionsFromBounty = (
  userId: string | undefined,
  bountyId: string,
  enabled?: boolean
) => {
  const { find } = Moralis_useGetSubmissionsFromBounty(bountyId, userId);
  const {
    data: submissions,
    isLoading,
    error,
  } = useQuery([Queries.BountySubmissions, bountyId], () => find(), {
    enabled,
  });
  return { submissions, isLoading, error };
};

export const useGetUserSubmissions = (userId: string, enabled?: boolean) => {
  const { find } = Moralis_useGetUserSubmissions(userId);
  const {
    data: submissions,
    isLoading,
    error,
  } = useQuery([Queries.BountySubmissions, userId], () => find(), {
    enabled,
  });
  return { submissions, isLoading, error };
};

export const useCanUserSubmit = (
  userId: string,
  bountyId: string,
  enabled = true
) => {
  const { data, isLoading, error } = useQuery(
    ['Can user submit', userId, bountyId],
    () => Moralis_canSubmit(userId, bountyId),
    { enabled }
  );

  return { data, isLoading, error };
};

export const useSubmitterInfo = (
  submitterId: string,
  bountyId: string,
  enabled = true
) => {
  const { data, isLoading, error } = useQuery(
    ['submitterInfo', submitterId, bountyId],
    () => Moralis_submitterInfo(submitterId, bountyId),
    { enabled }
  );

  return { data, isLoading, error };
};

export const useGetSubmissions = (
  config: SubmissionQueryParams,
  enabled = true
) => {
  const { isInitialized } = useMoralis();
  const page = config.page || 0;
  const { fetch } = Moralis_useGetSubmissions(config);

  const [numOfPages, setNumOfPages] = useState(0);

  const queryId = [Queries.AllSubmissions, config, config.page];

  const { error, isLoading, data, isFetching, isPreviousData } = useQuery(
    queryId,
    () => {
      return fetch();
    },
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
    submissions: data?.submissions || [],
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
