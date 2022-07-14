import { useQuery } from 'react-query';
import { InvoiceQueryParams } from '../models/queries/InvoiceQueryParams';
import { Moralis_GetInvoices } from '../moralis/serverMethods/GetInvoices';

export const useGetInvoices = (
  filters?: InvoiceQueryParams,
  enabled = true
) => {
  const { getInvoices } = Moralis_GetInvoices(filters);

  const { data, error, isLoading } = useQuery(
    ['invoices', filters],
    () => getInvoices(),
    {
      enabled,
    }
  );

  return { invoices: data, error, isLoading };
};
