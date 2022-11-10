import { GetInvoicesSchemaParams } from '@/server/routes/invoice/getInvoices';

import { trpc } from '../trpc';

export const useGetInvoices = (
  config: GetInvoicesSchemaParams,
  enabled = true
) => {
  const { error, isLoading, data } = trpc.invoice.getInvoices.useQuery(config, {
    enabled,
  });

  return {
    ...data,
    isLoading: isLoading,
    error,
  };
};
