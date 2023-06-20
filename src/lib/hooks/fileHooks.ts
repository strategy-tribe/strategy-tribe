import { trpc } from '@/lib/trpc';

//!Get one
export const useGetFile = (keys: string[], enabled = true) => {
  const { error, isLoading, data } = trpc.file.getSignedUrlPromise.useQuery(
    {
      keys,
    },
    { enabled }
  );

  return {
    fileUrl: data ?? null,
    error,
    isLoading,
  };
};
