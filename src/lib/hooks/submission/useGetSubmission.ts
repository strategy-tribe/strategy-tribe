import { trpc } from '@/lib/trpc';

export const useGetSubmission = (id: string, enabled = true) => {
  const { error, isLoading, data } = trpc.submission.getSubmission.useQuery(
    {
      id,
    },
    {
      enabled,
    }
  );
  return {
    submission: data?.submission,
    error,
    isLoading,
  };
};
