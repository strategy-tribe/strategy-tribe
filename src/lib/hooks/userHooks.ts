import { User } from '@prisma/client';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import { trpc } from '@/lib/trpc';

import { GetReferralsParams } from '@/server/routes/referrals/getReferrals';
import { PostReferralParams } from '@/server/routes/referrals/postReferral';
import { FullUser, GetUsersSchemaParams } from '@/server/routes/users/getUsers';
import { UpdateUsernameParams } from '@/server/routes/users/updateUsername';
import { UpdateUserRoleParams } from '@/server/routes/users/updateUserRole';

export const useGetUser = () => {
  const { error, isLoading, data } = trpc.user.getUser.useQuery();

  return {
    username: data?.user?.username ?? '',
    referralCode: data?.user?.referralCode ?? '',
    error,
    isLoading,
  };
};

//!Get All
export const useGetUsers = (config: GetUsersSchemaParams, enabled = true) => {
  const page = config.page || 0;

  const [numOfPages, setNumOfPages] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);

  const { error, isLoading, data, isFetching } = trpc.user.getUsers.useQuery(
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

  const users: FullUser[] = data?.users ?? [];

  return {
    isLoading,
    users,
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

export const useUpdateUserName = (events: {
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

export const useUpdateUserRole = (events: {
  onMutate: () => void;
  onSuccess: (userId: User) => void;
  onError: (e: any) => void;
}) => {
  const { onError, onMutate, onSuccess } = events;

  const qc = useQueryClient();

  const mutation = trpc.user.updateUserRole.useMutation({
    onMutate,
    onError,
    onSuccess: (user) => {
      qc.invalidateQueries();
      onSuccess(user);
    },
  });

  return {
    UpdateUserRole: async (params: UpdateUserRoleParams) => {
      mutation.mutate(params);
    },
    isLoading: mutation.isLoading,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
  };
};

export const usePostReferral = (events: {
  onMutate: () => void;
  onSuccess: () => void;
  onError: (e: any) => void;
}) => {
  const { onError, onMutate, onSuccess } = events;

  const qc = useQueryClient();

  const mutation = trpc.referral.postReferral.useMutation({
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

export const useGetReferrals = (config: GetReferralsParams, enabled = true) => {
  const page = config.page || 0;

  const [numOfPages, setNumOfPages] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);

  const { data, error, isLoading, isFetching } =
    trpc.referral.getReferrals.useQuery(config, {
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

export const useGetLeaderboardUsers = (enabled = true) => {
  const { error, isLoading, data } = trpc.user.getLeaderboardUsers.useQuery(
    {},
    { enabled }
  );

  return {
    leaderBoard: data?.users ?? undefined,
    error,
    isLoading,
  };
};
