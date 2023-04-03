import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import { trpc } from '@/lib/trpc';

import { GetBountiesParams } from '@/server/routes/bounties/getBounties';
import { PostReferralParams } from '@/server/routes/users/postreferral';
import { UpdateUsernameParams } from '@/server/routes/users/updateUsername';

export const useGetUser = () => {
  const { error, isLoading, data } = trpc.user.getUser.useQuery();

  return {
    username: data?.user?.username ?? '',
    referralCode: data?.user?.referralCode ?? '',
    error,
    isLoading,
  };
};

export const useUpdateUser = (events: {
  onMutate: () => void;
  onSuccess: () => void;
  onError: (e: any) => void;
}) => {
  const { onError, onMutate, onSuccess } = events;

  const qc = useQueryClient();

  const mutation = trpc.user.updateUsername.useMutation({
    onMutate,
    onError,
    onSuccess: () => {
      qc.invalidateQueries();
      onSuccess();
    },
  });

  return {
    UpdateUsername: async (params: UpdateUsernameParams) => {
      mutation.mutate(params);
    },
    isLoading: mutation.isLoading,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
  };
};

export const useGetInfo = (config: GetBountiesParams, enabled = true) => {
  const page = config.page || 0;

  const [numOfPages, setNumOfPages] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);

  const { error, isLoading, data, isFetching } = trpc.user.getInfo.useQuery(
    config,
    {
      enabled: enabled,
    }
  );

  const count = data?.count;

  useEffect(() => {
    if (data && count && config.amount) {
      const _numOfPages = Math.floor((count - 1) / config.amount + 1);
      setHasNextPage(_numOfPages - 1 > (config?.page ?? _numOfPages));
      setHasPreviousPage((config?.page ?? 0) != 0);
      setNumOfPages(_numOfPages);
    } else {
      setNumOfPages(0);
    }
  }, [data, config, count]);

  const info = data?.info ?? [];

  return {
    isLoading,
    info,
    isFetching: isFetching,
    page,
    numOfPages,
    count: count ?? 10,
    hasNextPage,
    hasPreviousPage,
    isPreviousData: false,
    error,
  };
};

export const usePostReferral = (events: {
  onMutate: () => void;
  onSuccess: () => void;
  onError: (e: any) => void;
}) => {
  const { onError, onMutate, onSuccess } = events;

  const qc = useQueryClient();

  const mutation = trpc.user.postReferral.useMutation({
    onMutate,
    onError,
    onSuccess: () => {
      qc.invalidateQueries();
      onSuccess();
    },
  });

  return {
    PostReferral: async (params: PostReferralParams) => {
      mutation.mutate(params);
    },
    isLoading: mutation.isLoading,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
  };
};
