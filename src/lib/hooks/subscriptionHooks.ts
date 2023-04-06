import { PostSubscriptionBountySchemaParams } from '@/server/routes/subscription/subscribeBounty';
import { PostSubscriptionSchemaParams } from '@/server/routes/subscription/subscribeOrg';
import { DeleteBountySubscriptionParams } from '@/server/routes/subscription/unSubscribeBounty';
import { DeleteSubscriptionParams } from '@/server/routes/subscription/unSubscribeOrg';
import { useQueryClient } from '@tanstack/react-query';
import { trpc } from '../trpc';

export const useIsSubscribed = (
  userId: string,
  orgId: string,
  enabled = true
) => {
  const { error, isLoading, data } =
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
  };
};

export const useIsSubscribedBounties = (
  userId: string,
  bountySlug: string,
  enabled = true
) => {
  const { error, isLoading, data } =
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

export const useSubscribe = (
  userId: string,
  orgId: string,
  bountySlugs: string[]
) => {
  const qc = useQueryClient();
  const mutation = trpc.subscriptionRouter.subscribeOrg.useMutation({
    onSuccess: () => {
      qc.invalidateQueries();
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

export const useSubscribeBounty = (userId: string, bountySlug: string) => {
  const qc = useQueryClient();
  const mutation = trpc.subscriptionRouter.subscribeBounty.useMutation({
    onSuccess: () => {
      qc.invalidateQueries();
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

export const useUnSubscribe = (userId: string, orgId: string) => {
  const qc = useQueryClient();
  const mutation = trpc.subscriptionRouter.unSubscribeOrg.useMutation({
    onSuccess: () => {
      qc.invalidateQueries();
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

export const useUnSubscribeBounties = (userId: string, bountySlug: string) => {
  const qc = useQueryClient();
  const mutation = trpc.subscriptionRouter.unSubscribeBounty.useMutation({
    onSuccess: () => {
      qc.invalidateQueries();
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
