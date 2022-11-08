import { useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import { z } from 'zod';

import { GetSubmissionsSchema } from '@/server/common/submission/schemas';
import { UserInput } from '@/server/common/submission/UserInput';

import { trpc } from '../trpc';

export const useSaveSubmission = (
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
  });

  return {
    Save: async () => {
      mutation.mutate({
        slug: bountyId,
        answers: content,
      });
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

export const useCanUserSubmit = (
  userId: string,
  bountyId: string,
  enabled = true
) => {
  throw new Error('useCanUserSubmit not implemented');
};

export const useSubmitterInfo = (
  submitterId: string,
  bountyId: string,
  enabled = true
) => {
  const { error, isLoading, data } = trpc.submission.getSubmitterInfo.useQuery(
    {
      submitterId,
      bountyId,
    },
    {
      enabled,
    }
  );

  return {
    data,
    error,
    isLoading,
  };
};

export const useGetSubmissions = (
  config: z.infer<typeof GetSubmissionsSchema>,
  enabled = true
) => {
  const page = config.page || 0;

  const [numOfPages, setNumOfPages] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);

  const { data, error, isLoading, isFetching } =
    trpc.submission.getSubmissions.useQuery(config, {
      enabled,
    });

  useEffect(() => {
    if (data && data.count && config.amount) {
      const count = data.count;
      const _numOfPages = Math.floor((count - 1) / config.amount + 1);
      setHasNextPage(_numOfPages - 1 > (config?.page ?? _numOfPages));
      setHasPreviousPage((config?.page ?? 0) != 0);
      setNumOfPages(_numOfPages);
    } else {
      setNumOfPages(0);
    }
  }, [data, config, data?.count]);

  return {
    isLoading,
    submissions: data?.submissions,
    isFetching,
    page,
    numOfPages,
    count: data?.count,
    hasNextPage,
    hasPreviousPage,
    isPreviousData: false,
    error,
  };
};
