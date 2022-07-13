import { REVIEWS_TABLE } from './tables';
import { Moralis } from 'moralis';
import { SubmissionState } from '@/lib/models/status';
import { Submission } from '@/lib/models/submission';

export const Moralis_useSaveReview = (
  grade: SubmissionState.Accepted | SubmissionState.Rejected,
  submission: Submission,
  reviewerId: string,
  reviewerComment?: string
): { save: () => Promise<string | undefined> } => {
  const save = async () => {
    const reviewRef = new Moralis.Object(REVIEWS_TABLE);
    //data
    reviewRef.set('grade', grade);
    reviewRef.set('submissionId', submission.id);
    reviewRef.set('reviewerId', reviewerId);
    reviewRef.set('reviewerComment', reviewerComment);

    const reviewClass = Moralis.Object.extend(REVIEWS_TABLE);
    const review = new reviewClass(reviewRef.attributes);

    const context = { userId: submission.owner };
    const response = await review.save(null, { context: context });

    return response.id;
  };

  return {
    save,
  };
};
