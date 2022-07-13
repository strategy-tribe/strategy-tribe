import { useAuth } from 'auth/AuthContext';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  Moralis_getNotifications,
  Moralis_setNotificationRead,
} from '../moralis/serverMethods/Moralis_ServerNotifications';

const getQueryId = (userId: string) => {
  return ['get user server notifs', userId];
};

type Options = {
  onlyUnread?: boolean;
  enabled?: boolean;
  amount?: number;
};

export const useGetUserServerNotifications = (
  userId: string,
  options?: Options
) => {
  const queryId = getQueryId(userId);

  const { fetch } = Moralis_getNotifications(
    userId,
    options?.amount,
    options?.onlyUnread
  );

  const {
    data: notifications,
    isLoading,
    error,
  } = useQuery(queryId, async () => fetch(), { enabled: options?.enabled });

  return { notifications, isLoading, error };
};

export const useReadNotification = (
  notificationId: string,
  events?: {
    onSuccess: () => void;
    onError: () => void;
  }
) => {
  const q = useQueryClient();

  const { userId } = useAuth();

  const { call } = Moralis_setNotificationRead();

  const { mutate } = useMutation(() => call(notificationId), {
    onError: events?.onError,
    onSuccess: () => {
      if (events?.onSuccess) events?.onSuccess();
      q.invalidateQueries(getQueryId(userId || ''));
    },
  });

  return {
    mutate: () => {
      mutate();
    },
  };
};
