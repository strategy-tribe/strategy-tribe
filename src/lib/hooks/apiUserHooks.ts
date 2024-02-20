import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import { GetApiUsersParams } from '@/server/routes/apiUsers/getApiUsers';
import { PostApiUserParams } from '@/server/routes/apiUsers/postApiUser';

import { trpc } from '../trpc';

export const useSubmitApiUser = (events: {
  onMutate: () => void;
  onSuccess: (apiUserId: string) => void;
  onError: (e: any) => void;
}) => {
  const { onError, onMutate, onSuccess } = events;

  const qc = useQueryClient();

  const mutation = trpc.apiUser.postApiUser.useMutation({
    onMutate,
    onError,
    onSuccess: (data) => {
      qc.invalidateQueries();
      onSuccess(data.apiUser);
    },
  });

  return {
    SubmitApiUser: async (params: PostApiUserParams) => {
      mutation.mutate(params);
    },
    isLoading: mutation.isLoading,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
  };
};

export const useGetApiUsers = (config: GetApiUsersParams, enabled = true) => {
  const page = config.page || 0;

  const [numOfPages, setNumOfPages] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);

  const { data, error, isLoading, isFetching } =
    trpc.apiUser.getApiUsers.useQuery(config, {
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
export const useGetApiUser = (id: string, enabled = true) => {
  const { error, isLoading, data } = trpc.apiUser.getApiUser.useQuery(
    {
      id,
    },
    { enabled }
  );

  return {
    apiUser: data?.apiUser ?? undefined,
    error,
    isLoading,
  };
};
