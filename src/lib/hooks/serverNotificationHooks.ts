import { useEffect, useState } from 'react';

import { GetManyNotificationsParams } from '@/server/routes/notification/getMany';
import { MarkAsReadParams } from '@/server/routes/notification/markAsRead';

import { trpc } from '../trpc';

export const useGetUserServerNotifications = (
  config: GetManyNotificationsParams,
  enabled = true
) => {
  const page = config.page || 0;

  const [numOfPages, setNumOfPages] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);

  const { data, error, isLoading, isFetching } =
    trpc.notification.getMany.useQuery(config, {
      enabled,
      refetchOnWindowFocus: true,
      // refetchInterval: 3000,
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

export const useReadNotification = (events: {
  onMutate: () => void;
  onSuccess: (id?: string) => void;
  onError: (e: any) => void;
}) => {
  const { onError, onMutate, onSuccess } = events;
  const mutation = trpc.notification.markAsRead.useMutation({
    onMutate,
    onError,
    onSuccess: () => {
      onSuccess();
    },
  });
  return {
    Pay: async (p: MarkAsReadParams) => {
      mutation.mutate(p);
    },
    isLoading: mutation.isLoading,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
  };
};
