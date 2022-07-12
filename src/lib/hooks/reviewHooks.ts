import { Submission, SubmissionState } from '@/models/index';
import { Moralis_useSaveReview } from '@/lib/moralis/serverMethods/Moralis_Reviews';
import { useMutation, useQueryClient } from 'react-query';

export const useSubmitReview = (
  grade: SubmissionState.Accepted | SubmissionState.Rejected,
  submission: Submission,
  reviewerId: string,
  reviewerComment?: string,
  onSuccess?: () => void,
  onError?: (e: any) => void
) => {
  const q = useQueryClient();
  const { save } = Moralis_useSaveReview(
    grade,
    submission,
    reviewerId,
    reviewerComment
  );

  const { mutate } = useMutation(() => save(), {
    onSuccess: () => {
      q.invalidateQueries();
      if (onSuccess) onSuccess();
    },
    onError,
  });

  return {
    SubmitReview: mutate,
  };
};
