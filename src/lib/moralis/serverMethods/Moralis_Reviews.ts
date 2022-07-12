import { REVIEWS_TABLE, SUBMISSION_TABLE } from './tables';
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
    //!Save the review
    const reviewRefObj = new Moralis.Object(REVIEWS_TABLE);
    //data
    reviewRefObj.set('grade', grade);
    reviewRefObj.set('submissionId', submission.id);
    reviewRefObj.set('reviewerId', reviewerId);
    reviewRefObj.set('reviewerComment', reviewerComment);
    //ACL
    const acl = new Moralis.ACL();
    acl.setPublicReadAccess(false);
    acl.setPublicWriteAccess(false);
    acl.setRoleWriteAccess('staff', false);
    acl.setRoleReadAccess('staff', true);
    acl.setReadAccess(submission.owner, true);
    reviewRefObj.setACL(acl);

    //Save to db
    const response = await reviewRefObj.save();
    const reviewId = response.id;

    return reviewId;
  };

  return {
    save,
  };
};
