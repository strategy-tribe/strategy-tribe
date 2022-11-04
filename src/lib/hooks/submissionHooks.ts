import { UserInput } from '@/components/pages/submission/new submission/UserInput';
import { useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import { trpc } from '../trpc';

export const useSaveSubmission = (
  address: string,
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

  const mutation = trpc.submission.post.useMutation({
    onMutate,
    onError,
    onSuccess: (data) => {
      q.invalidateQueries();
      onSuccess(data.submissionId);
    },
  })

  return {
    Save: async ()=>{
      mutation.mutate({
        slug: bountyId,
        address,
        answers: content
      })
    },
    isLoading: mutation.isLoading,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
  };
};

//!Get one
export const useGetSubmission = (id: string, enabled = true) => {
  const { error, isLoading, data } = trpc.submission.getSubmission.useQuery(
    {
      id,
    },
    { enabled }
  );

  return {
    submission: data?.submission,
    error,
    isLoading,
  };
};

export const useGetSubmissionsFromBounty = (
  userId: string | undefined,
  bountyId: string,
  enabled?: boolean
) => {
  // const { find } = Moralis_useGetSubmissionsFromBounty(bountyId, userId);
  // const {
  //   data: submissions,
  //   isLoading,
  //   error,
  // } = useQuery([Queries.BountySubmissions, bountyId], () => find(), {
  //   enabled,
  // });
  return {
    submissions: [],
    isLoading: true,
    error: {
      msg: 'this functionality needs refactoring ',
    },
  };
};

export const useGetUserSubmissions = (userId: string, enabled?: boolean) => {
  // const { find } = Moralis_useGetUserSubmissions(userId);
  // const {
  //   data: submissions,
  //   isLoading,
  //   error,
  // } = useQuery([Queries.BountySubmissions, userId], () => find(), {
  //   enabled,
  // });
  return {
    submissions: [],
    isLoading: true,
    error: {
      msg: 'this functionality needs refactoring ',
    },
  };
};

export const useCanUserSubmit = (
  userId: string,
  bountyId: string,
  enabled = true
) => {
  // const { data, isLoading, error } = useQuery(
  //   ['Can user submit', userId, bountyId],
  //   () => Moralis_canSubmit(userId, bountyId),
  //   { enabled }
  // );

  return {
    data: false,
    isLoading: true,
    error: {
      msg: 'this functionality needs refactoring ',
    },
  };
};

export const useSubmitterInfo = (
  submitterId: string,
  bountyId: string,
  enabled = true
) => {
  const { error, isLoading, data, isFetching } =
    trpc.submission.getSubmitterInfo.useQuery(
      {
        submitterId,
        bountyId
      },
      {
        enabled
      }
    );

    return {
      data,
      error,
      isLoading,
    };
};

export const useGetSubmissions = (config: any, enabled = true) => {
  const page = config.page || 0;

  const [numOfPages, setNumOfPages] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);
  
  const { error, isLoading, data, isFetching } =
    trpc.submission.getSubmissions.useQuery(
      config,
      {
        enabled
      }
    );

    const {data: countData} = trpc.submission.getTotalCount.useQuery(
      config, {
        enabled: true
      }
    );

  useEffect(() => {
    if (data && countData && config.amount) {
      const count = countData?.submissionsCount;
      const _numOfPages = Math.floor((count - 1) / config.amount + 1);
      setHasNextPage((_numOfPages-1)>(config?.page ?? _numOfPages))
      setHasPreviousPage((config?.page ?? 0)!=0)
      setNumOfPages(_numOfPages);
    } else {
      setNumOfPages(0);
    }
  }, [data, config, countData]);

  return {
    isLoading,
    submissions: data?.submissions ?? [],
    isFetching,
    page,
    numOfPages,
    count: countData?.submissionsCount ?? 10,
    hasNextPage,
    hasPreviousPage,
    isPreviousData: false,
    error,
  };
};
