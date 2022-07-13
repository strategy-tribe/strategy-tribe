import { useQuery } from 'react-query';
import { Moralis_GetInvoices } from '../moralis/serverMethods/GetInvoices';

export const useGetInvoices = (userId: string, enabled = true) => {
  const { getInvoices } = Moralis_GetInvoices(userId);

  const { data, error, isLoading } = useQuery('', () => getInvoices(), {
    enabled,
  });

  return { invoices: data, error, isLoading };
};
