export const useGetWallets = (filters: any, enabled = true) => {
  // const { getInvoices } = Moralis_GetWallets(filters);

  // const { data, error, isLoading } = useQuery(
  //   ['wallets', filters],
  //   () => getInvoices(),
  //   {
  //     keepPreviousData: filters.paginate,
  //     enabled,
  //   }
  // );

  return { wallets: [], error: undefined, isLoading: true };
};
