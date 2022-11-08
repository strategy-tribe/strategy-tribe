import Queries from '@/lib/utils/Queries';

const queryForSubs = (userId: string, orgName: string) => [
  Queries.isSubscribed,
  orgName,
  userId,
];

const queryForUserInfo = (userId: string) => {
  return [userId, 'userInfo'];
};

const queryForUserSubsToAll = (userId: string) => {
  return [userId, 'sub to all'];
};

export const useIsSubscribed = (
  userId: string,
  orgId: string,
  enabled = true
) => {
  // const { isSubscribed } = usePushNotifs();

  // const queryId = queryForSubs(userId, orgId);

  // const { isLoading, data, error } = useQuery(
  //   queryId,
  //   () => isSubscribed(userId, orgName),
  //   {
  //     enabled,
  //     staleTime: 1000,
  //   }
  // );

  return {
    isLoading: true,
    isSubscribed: false,
    error: {
      msg: 'feature needs refactoring',
    },
  };
};

export const useSubscribe = (userId: string, orgId: string) => {
  // const { subscribeToOrg, unsubscribeToOrg } = usePushNotifs();
  // const q = useQueryClient();

  // const {
  //   mutate: subscribe,
  //   error: subError,
  //   isLoading: isLoadingSub,
  // } = useMutation(() => subscribeToOrg(userId, orgName), {
  //   onSuccess: () => {
  //     q.invalidateQueries(queryForSubs(userId, orgName));
  //     q.invalidateQueries(queryForUserInfo(userId));
  //   },
  // });

  // const {
  //   mutate: unsubscribe,
  //   error: unsubError,
  //   isLoading: isLoadingUnsub,
  // } = useMutation(() => unsubscribeToOrg(userId, orgName), {
  //   onSuccess: () => {
  //     q.invalidateQueries(queryForSubs(userId, orgName));
  //     q.invalidateQueries(queryForUserInfo(userId));
  //   },
  // });

  return {
    subscribe: () => {
      //
    },
    unsubscribe: () => {
      //
    },
    subError: {
      msg: 'feature needs refactoring',
    },
    unsubError: {
      msg: 'feature needs refactoring',
    },
    isLoading: true,
  };
};

//!-------

export const useIsSubscribeToAll = (userId: string, enabled = true) => {
  // const { isSubscribedToAll } = usePushNotifs();
  // const queryId = queryForUserSubsToAll(userId);
  // const { isLoading, data, error } = useQuery(
  //   queryId,
  //   () => isSubscribedToAll(userId),
  //   {
  //     enabled,
  //   }
  // );

  return {
    isLoading: true,
    isSubscribedToAll: false,
    error: {
      msg: 'feature needs refactoring',
    },
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
  // const { onError, onSuccess } = afterSubscribe;
  // const { subscribeToAllOrgs, unsubscribeFromAllOrgs } = usePushNotifs();
  // const q = useQueryClient();

  // const {
  //   mutate: subscribeToAll,
  //   error: subError,
  //   isLoading: isLoadingSub,
  // } = useMutation(() => subscribeToAllOrgs(userId), {
  //   onSuccess: () => {
  //     q.invalidateQueries(queryForUserSubsToAll(userId));
  //     q.invalidateQueries(queryForUserInfo(userId));
  //     if (onSuccess) onSuccess();
  //   },
  //   onError,
  // });

  // const {
  //   mutate: unsubscribeFromAll,
  //   error: unsubError,
  //   isLoading: isLoadingUnsub,
  // } = useMutation(() => unsubscribeFromAllOrgs(userId), {
  //   onSuccess: () => {
  //     q.invalidateQueries(queryForUserSubsToAll(userId));
  //     q.invalidateQueries(queryForUserInfo(userId));
  //     if (afterUnsubscribe?.onSuccess) afterUnsubscribe.onSuccess();
  //   },
  //   onError: (e) => {
  //     if (afterUnsubscribe?.onError) afterUnsubscribe.onError(e);
  //   },
  // });

  return {
    subscribeToAll: () => {
      //
    },
    unsubscribeFromAll: () => {
      //
    },
    subError: {
      msg: 'feature needs refactoring',
    },
    unsubError: {
      msg: 'feature needs refactoring',
    },
    isLoading: true,
    isLoadingUnsub: true,
  };
};
