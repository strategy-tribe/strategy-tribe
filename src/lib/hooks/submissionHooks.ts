import { UserInput } from '@/components/pages/submission/new submission/UserInput';
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
  const { error, isLoading, data, isFetching } =
    trpc.submission.getSubmissions.useQuery(
      config,
      {
        enabled
      }
    );

  return {
    isLoading,
    submissions: data?.submissions ?? [],
    isFetching,
    page: 0,
    numOfPages: 0,
    count: 0,
    hasNextPage: false,
    hasPreviousPage: false,
    isPreviousData: false,
    error: error,
  };
};
