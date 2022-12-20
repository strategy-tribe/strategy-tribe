import { useEffect, useState } from 'react';

import { GetInvoicesSchemaParams } from '@/server/routes/invoice/getInvoices';
import { PayInvoiceSchemaParams } from '@/server/routes/invoice/payInvoice';

import { trpc } from '../trpc';

export const useGetInvoices = (
  config: GetInvoicesSchemaParams,
  enabled = true
) => {
  const page = config.page || 0;

  const [numOfPages, setNumOfPages] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);

  const { data, error, isLoading, isFetching } =
    trpc.invoice.getInvoices.useQuery(config, {
      enabled,
    });

  useEffect(() => {
    if (data && data.count && config.amount) {
      const count = data.count;
      const _numOfPages = Math.floor((count - 1) / config.amount + 1);
      setHasNextPage(_numOfPages - 1 > (config?.page ?? _numOfPages));
      setHasPreviousPage((config?.page ?? 0) != 0);
      setNumOfPages(_numOfPages);
    } else {
      setNumOfPages(0);
    }
  }, [data, config, data?.count]);

  return {
    ...data,
    isLoading,
    isFetching,
    page,
    numOfPages,
    hasNextPage,
    hasPreviousPage,
    isPreviousData: false,
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
