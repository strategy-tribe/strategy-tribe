import {
  Molaris_useSaveSubmission,
  Moralis_canSubmit,
  Moralis_useGetSubmission,
  Moralis_useGetSubmissions,
  Moralis_useGetSubmissionsFromBounty,
  Moralis_useGetUserSubmissions,
} from '@/lib/moralis/serverMethods/Moralis_Submissions';
import Queries from '@/utils/Queries';
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from 'react-query';

import { SubmissionQueryParams } from '@/lib/models/queryParams';
import { Submission } from '../models';
import { UserInput } from '@/components/pages/submission/UserInput';

export const useSaveSubmission = (
  owner: string,
  content: UserInput[],
  bountyId: string,
  onMutate: () => void,
  onSuccess: (id?: string) => void,
  onError: (e: any) => void
) => {
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
  const {
    data: canSubmit,
    isLoading,
    error,
  } = useQuery(
    ['Can user submit', userId, bountyId],
    () => Moralis_canSubmit(userId, bountyId),
    { enabled }
  );

  return { canSubmit, isLoading, error };
};

export const useGetSubmissions = (
  config: SubmissionQueryParams,
  enabled = true
) => {
  const { fetch } = Moralis_useGetSubmissions(config);

  const { error, isLoading, data, isFetching, isPreviousData, fetchNextPage } =
    useInfiniteQuery(
      [Queries.AllSubmissions, config],
      ({ pageParam = 1 }) => fetch(pageParam),
      {
        getNextPageParam: (lastPackage) => {
          if (lastPackage.hasMore) return lastPackage.page + 1;
          else return false;
        },
        enabled,
        keepPreviousData: config.paginate,
      }
    );

  let submissions: Submission[] = [];
  data?.pages.forEach((d) => {
    submissions = [...submissions, ...d.submissions];
  });

  return {
    isLoading,
    submissions,
    isFetching,
    nextPage: fetchNextPage,
    hasMore: data?.pages.at(-1)?.hasMore,
    isPreviousData,
    error,
  };
};
