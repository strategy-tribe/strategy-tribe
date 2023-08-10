import { trpc } from '@/lib/trpc';

export const useCanUserSubmit = (slug: string, enabled = true) => {
  const { data, isLoading, error } = trpc.submission.canUserSubmit.useQuery(
    {
      bountySlug: slug,
    },
    {
      enabled,
    }
  );
  return { ...data, isLoading, error };
};
