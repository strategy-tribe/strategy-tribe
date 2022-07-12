import { useQuery } from 'react-query';
import { Moralis_getNotifications } from '../moralis/serverMethods/Moralis_ServerNotifications';

const getQueryId = (userId: string, amount: number | undefined) => {
  return ['get user server notifs', userId, amount];
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
  const queryId = getQueryId(userId, options?.amount);

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
