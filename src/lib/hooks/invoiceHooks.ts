import { GetInvoicesSchemaParams } from '@/server/routes/invoice/getInvoices';
import { PayInvoiceSchemaParams } from '@/server/routes/invoice/payInvoice';

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

export const usePayInvoice = (events: {
  onMutate: () => void;
  onSuccess: (id?: string) => void;
  onError: (e: any) => void;
}) => {
  const { onError, onMutate, onSuccess } = events;
  const mutation = trpc.invoice.payInvoice.useMutation({
    onMutate,
    onError,
    onSuccess: () => {
      onSuccess();
    },
  });
  return {
    Pay: async (p: PayInvoiceSchemaParams) => {
      mutation.mutate(p);
    },
    isLoading: mutation.isLoading,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
  };
};
