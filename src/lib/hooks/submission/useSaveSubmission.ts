import { trpc } from '@/lib/trpc';

import { PostSubmissionParams } from '@/server/routes/submission/postSubmission';

export const useSaveSubmission = (events: {
  onMutate: () => void;
  onSuccess: (id?: string) => void;
  onError: (e: any) => void;
}) => {
  const { onError, onMutate, onSuccess } = events;
  const mutation = trpc.submission.post.useMutation({
    onMutate,
    onError,
    onSuccess: (data) => {
      onSuccess(data.submissionId);
    },
  });
  return {
    Save: async (p: PostSubmissionParams) => {
      mutation.mutate(p);
    },
    isLoading: mutation.isLoading,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
  };
};
