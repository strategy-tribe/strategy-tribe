import { trpc } from '@/lib/trpc';

import { GetSubmitterInfoParams } from '@/server/routes/submission/getSubmitterInfo';

export const useSubmitterInfo = (
  params: GetSubmitterInfoParams,
  enabled = true
) => {
  const { error, isLoading, data } = trpc.submission.getSubmitterInfo.useQuery(
    params,
    {
      enabled,
    }
  );
  return {
    data,
    error,
    isLoading,
  };
};
