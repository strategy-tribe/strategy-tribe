import { GetBalanceParams } from '@/server/routers/wallet';

import { trpc } from '../trpc';

export const useGetBalance = (
  params: GetBalanceParams,
  config?: { enabled: boolean }
) => {
  const { data, isLoading, error } = trpc.wallet.getBalance.useQuery(params, {
    ...config,
  });

  return { balance: data?.balance, isLoading, error };
};
