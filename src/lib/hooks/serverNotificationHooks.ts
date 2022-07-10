import { useQuery } from 'react-query';
import { Moralis_getNotifications } from '../moralis/serverMethods/Moralis_ServerNotifications';

const getQueryId = (userId: string, amount: number) => {
  return ['get user server notifs', userId, amount];
};

export const useGetUserServerNotifications = (userId: string, amount = 3) => {
  const queryId = getQueryId(userId, amount);

  const { fetch } = Moralis_getNotifications(userId, amount);

  const {
    data: notifications,
    isLoading,
    error,
  } = useQuery(queryId, async () => fetch());

  return { notifications, isLoading, error };
};
