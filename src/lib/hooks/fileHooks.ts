import { trpc } from '@/lib/trpc';

//!Get one
export const useGetFile = (key: string, enabled = true) => {
  const { error, isLoading, data } = trpc.file.getSignedUrlPromise.useQuery(
    {
      key,
    },
    { enabled }
  );

  return {
    fileUrl: data ?? null,
    error,
    isLoading,
  };
};
