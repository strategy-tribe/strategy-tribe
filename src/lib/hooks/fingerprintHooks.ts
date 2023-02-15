import { useQueryClient } from '@tanstack/react-query';

import { ConnectBountyParams } from '@/server/routes/fingerprint/connectBounty';

import { trpc } from '../trpc';

export const useConnectToBounty = () => {
  const qc = useQueryClient();

  const mutation = trpc.fingerprint.connectBounty.useMutation({
    onSuccess: () => {
      qc.invalidateQueries();
    },
  });

  return {
    Connect: async (params: ConnectBountyParams) => {
      mutation.mutate(params);
    },
    isLoading: mutation.isLoading,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
  };
};
