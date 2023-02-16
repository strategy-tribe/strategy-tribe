import { useQueryClient } from '@tanstack/react-query';

import { trpc } from '@/lib/trpc';

import { UpdateUsernameParams } from '@/server/routes/users/updateUsername';

export const useGetUser = () => {
  const { error, isLoading, data } = trpc.user.getUser.useQuery();

  return {
    username: data?.user?.username ?? '',
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
