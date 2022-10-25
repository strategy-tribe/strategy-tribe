export const useGetInvoices = (filters?: any, enabled = true) => {
  // const { getInvoices } = Moralis_GetInvoices(filters);

  // const { data, error, isLoading } = useQuery(
  //   ['invoices', filters],
  //   () => getInvoices(),
  //   {
  //     enabled,
  //   }
  // );

  return {
    invoices: undefined,
    error: {
      msg: 'feature needs refactoring',
    },
    isLoading: true,
  };
};
