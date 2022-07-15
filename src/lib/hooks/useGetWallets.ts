import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import {
  Moralis_GetWallets,
  WalletQueryParams,
} from '../moralis/serverMethods/getWallets';

export const useGetWallets = (filters: WalletQueryParams, enabled = true) => {
  const { getInvoices } = Moralis_GetWallets(filters);

  const { data, error, isLoading } = useQuery(
    ['wallets', filters],
    () => getInvoices(),
    {
      keepPreviousData: filters.paginate,
      enabled,
    }
  );

  return { wallets: data, error, isLoading };
};
