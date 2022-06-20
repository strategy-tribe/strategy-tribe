import Queries from '@/utils/Queries';
import { usePushNotifs } from '@/lib/onesignal/PushNotifsContext';
import { useMutation, useQuery, useQueryClient } from 'react-query';

const subsQuery = (userId: string, orgName: string) => [
  Queries.isSubscribed,
  orgName,
  userId,
];

export const useIsSubscribed = (
  userId: string,
  orgName: string,
  enabled = true
) => {
  const { isSubscribed } = usePushNotifs();
  const { isLoading, data, error } = useQuery(
    subsQuery(userId, orgName),
    () => isSubscribed(userId, orgName),
    {
      enabled,
    }
  );

  return {
    isLoading,
    isSubscribed: data,
    error,
  };
};

export const useSubscribe = (userId: string, orgName: string) => {
  const { subscribeToOrg, unsubscribeToOrg } = usePushNotifs();
  const q = useQueryClient();

  const {
    mutate: subscribe,
    error: subError,
    isLoading: isLoadingSub,
  } = useMutation(() => subscribeToOrg(userId, orgName), {
    onSuccess: () => {
      q.invalidateQueries(subsQuery(userId, orgName));
      q.invalidateQueries([userId, 'userInfo']);
    },
  });

  const {
    mutate: unsubscribe,
    error: unsubError,
    isLoading: isLoadingUnsub,
  } = useMutation(() => unsubscribeToOrg(userId, orgName), {
    onSuccess: () => {
      q.invalidateQueries(subsQuery(userId, orgName));
      q.invalidateQueries([userId, 'userInfo']);
    },
  });

  return {
    subscribe,
    unsubscribe,
    subError,
    unsubError,
    isLoading: isLoadingSub || isLoadingUnsub,
  };
};

//!-------

export const useIsSubscribeToAll = (userId: string, enabled = true) => {
  const { isSubscribedToAll } = usePushNotifs();
  const { isLoading, data, error } = useQuery(
    [userId, 'sub to all'],
    () => isSubscribedToAll(userId),
    {
      enabled,
    }
  );

  return {
    isLoading,
    isSubscribedToAll: data,
    error,
  };
};

export const useSubscribeToAll = (
  userId: string,
  afterSubscribe: {
    onSuccess?: () => void;
    onError?: (err: any) => void;
  },
  afterUnsubscribe?: {
    onSuccess?: () => void;
    onError?: (err: any) => void;
  }
) => {
  const { onError, onSuccess } = afterSubscribe;
  const { subscribeToAllOrgs, unsubscribeFromAllOrgs } = usePushNotifs();
  const q = useQueryClient();

  const {
    mutate: subscribeToAll,
    error: subError,
    isLoading: isLoadingSub,
  } = useMutation(() => subscribeToAllOrgs(userId), {
    onSuccess: () => {
      q.invalidateQueries([userId, 'sub to all']);
      q.invalidateQueries([userId, 'userInfo']);
      if (onSuccess) onSuccess();
    },
    onError,
  });

  const {
    mutate: unsubscribeFromAll,
    error: unsubError,
    isLoading: isLoadingUnsub,
  } = useMutation(() => unsubscribeFromAllOrgs(userId), {
    onSuccess: () => {
      q.invalidateQueries([userId, 'sub to all']);
      q.invalidateQueries([userId, 'userInfo']);
      if (afterUnsubscribe?.onSuccess) afterUnsubscribe.onSuccess();
    },
    onError: (e) => {
      if (afterUnsubscribe?.onError) afterUnsubscribe.onError(e);
    },
  });

  return {
    subscribeToAll,
    unsubscribeFromAll,
    subError,
    unsubError,
    isLoading: isLoadingSub,
    isLoadingUnsub,
  };
};
