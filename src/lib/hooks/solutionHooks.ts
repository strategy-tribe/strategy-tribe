import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import { GetSolutionsSchemaParams } from '@/server/routes/solutions/getSolutions';
import { PostSolutionParams } from '@/server/routes/solutions/postSolution';

import { trpc } from '../trpc';

export const useSubmitSolution = (events: {
  onMutate: () => void;
  onSuccess: () => void;
  onError: (e: any) => void;
}) => {
  const { onError, onMutate, onSuccess } = events;

  const qc = useQueryClient();

  const mutation = trpc.solution.post.useMutation({
    onMutate,
    onError,
    onSuccess: () => {
      qc.invalidateQueries();
      onSuccess();
    },
  });

  return {
    SubmitSolution: async (params: PostSolutionParams) => {
      mutation.mutate(params);
    },
    isLoading: mutation.isLoading,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
  };
};

export const useGetSolutions = (
  config: GetSolutionsSchemaParams,
  enabled = true
) => {
  const page = config.page || 0;

  const [numOfPages, setNumOfPages] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);

  const { data, error, isLoading, isFetching } =
    trpc.solution.getSolutions.useQuery(config, {
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
    ...data,
    isLoading,
    isFetching,
    page,
    numOfPages,
    hasNextPage,
    hasPreviousPage,
    isPreviousData: false,
    error,
  };
};

//!Get one
export const useGetSolution = (id: string, enabled = true) => {
  const { error, isLoading, data } = trpc.solution.getSolution.useQuery(
    {
      id,
    },
    { enabled }
  );

  return {
    solution: data?.solution ?? undefined,
    error,
    isLoading,
  };
};
