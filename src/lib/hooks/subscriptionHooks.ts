import { PostSubscriptionBountySchemaParams } from '@/server/routes/subscription/subscribeBounty';
import { PostSubscriptionSchemaParams } from '@/server/routes/subscription/subscribeOrg';
import { DeleteBountySubscriptionParams } from '@/server/routes/subscription/unSubscribeBounty';
import { DeleteSubscriptionParams } from '@/server/routes/subscription/unSubscribeOrg';
import { trpc } from '../trpc';

export const useIsSubscribed = (
  userId: string,
  orgId: string,
  enabled = true
) => {
  const { error, isLoading, data, refetch } =
    trpc.subscriptionRouter.getSubscriptionStatus.useQuery(
      { userId, orgId },
      {
        enabled: enabled,
      }
    );
  return {
    isLoading,
    isSubscribed: data?.subscriptionStatus,
    error,
    refetch,
  };
};

export const useIsSubscribedBounties = (
  userId: string,
  bountySlug: string,
  enabled = true
) => {
  const { error, isLoading, data, refetch } =
    trpc.subscriptionRouter.getSubscriptionStatusBounty.useQuery(
      { userId, bountySlug },
      {
        enabled: enabled,
      }
    );
  return {
    isLoading,
    isSubscribed: data?.subscriptionStatus,
    error,
    refetch,
  };
};

export const getSubscribedOrgs = (userId: string, enabled = true) => {
  const { error, isLoading, data } =
    trpc.subscriptionRouter.getSubscribedOrgs.useQuery(
      { userId },
      {
        enabled: enabled,
      }
    );
  return {
    isLoading,
    subscribedOrgs: data?.subscribedOrgs,
    error,
  };
};

export const getSubscribedBounties = (userId: string, enabled = true) => {
  const { error, isLoading, data } =
    trpc.subscriptionRouter.getSubscribedBounties.useQuery(
      { userId },
      {
        enabled: enabled,
      }
    );

  return {
    isLoading,
    subscribedBounties: data?.allSubscribedBounties,
    error,
  };
};

export const useSubscribe = (events: { onSuccess: () => void }) => {
  const { onSuccess } = events;
  const mutation = trpc.subscriptionRouter.subscribeOrg.useMutation({
    onSuccess: () => {
      onSuccess();
    },
  });
  return {
    SubscribeToOrg: async (params: PostSubscriptionSchemaParams) => {
      mutation.mutate(params);
    },
    isLoading: mutation.isLoading,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
  };
};

export const useUnSubscribe = (events: { onSuccess: () => void }) => {
  const { onSuccess } = events;
  const mutation = trpc.subscriptionRouter.unSubscribeOrg.useMutation({
    onSuccess: () => {
      onSuccess();
    },
  });
  return {
    UnSubscribeToOrg: async (params: DeleteSubscriptionParams) => {
      mutation.mutate(params);
    },
    isLoading: mutation.isLoading,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
  };
};

export const useSubscribeBounty = (events: { onSuccess: () => void }) => {
  const { onSuccess } = events;
  const mutation = trpc.subscriptionRouter.subscribeBounty.useMutation({
    onSuccess: () => {
      onSuccess();
    },
  });
  return {
    SubscribeToBounty: async (params: PostSubscriptionBountySchemaParams) => {
      mutation.mutate(params);
    },
    isLoading: mutation.isLoading,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
  };
};

export const useUnSubscribeBounties = (events: { onSuccess: () => void }) => {
  const { onSuccess } = events;
  const mutation = trpc.subscriptionRouter.unSubscribeBounty.useMutation({
    onSuccess: () => {
      onSuccess();
    },
  });
  return {
    UnSubscribeToBounty: async (params: DeleteBountySubscriptionParams) => {
      mutation.mutate(params);
    },
    isLoading: mutation.isLoading,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
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
