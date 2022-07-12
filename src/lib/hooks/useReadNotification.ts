import { useMutation, useQuery } from 'react-query';
import { Moralis_setNotificationRead } from '../moralis/serverMethods/Moralis_ServerNotifications';

export const useReadNotification = (
  notificationId: string,
  events?: {
    onSuccess: () => void;
    onError: () => void;
  }
) => {
  const { call } = Moralis_setNotificationRead();

  const { mutate } = useMutation(() => call(notificationId), {
    onError: events?.onError,
    onSuccess: events?.onSuccess,
  });

  return {
    mutate: () => {
      mutate();
    },
  };
};
