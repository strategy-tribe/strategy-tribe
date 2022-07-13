//*Reviews

const ACCEPTED_STATE = 'Accepted';
const REJECTED_STATE = 'Rejected';
const WAITING_FOR_PAYMENT_STATE = 'Waiting for payment';

Moralis.Cloud.beforeSave(REVIEWS_TABLE, async function (request) {
  try {
    const {
      object: review,
      context: { userId },
    } = request;

    const reviewACL = new Moralis.ACL();

    //public
    reviewACL.setPublicWriteAccess(false);
    reviewACL.setPublicReadAccess(false);

    //staff
    reviewACL.setRoleWriteAccess(STAFF_ROLE, false);
    reviewACL.setRoleReadAccess(STAFF_ROLE, true);

    //user
    reviewACL.setReadAccess(userId, true);

    //admin
    reviewACL.setRoleWriteAccess(ADMIN_ROLE, true);
    reviewACL.setRoleReadAccess(ADMIN_ROLE, true);

    review.setACL(reviewACL);
  } catch (error) {
    ERROR(`Error applying ACL to Review. Reason: ${error}`);
  }
});

Moralis.Cloud.afterSave(REVIEWS_TABLE, async function (request) {
  //*Connect the review and the submission
  //get the submission
  const submissionId = request.object.get('submissionId');
  const submissionRef = await GetSubmissionByID(submissionId);
  if (!submissionRef) {
    ERROR('Validation error: Submission not found');
  }

  //check the grade of the review
  let submissionState = REJECTED_STATE;

  const reviewGrade = request.object.get('grade');

  if (reviewGrade === ACCEPTED_STATE) {
    submissionState = WAITING_FOR_PAYMENT_STATE;
  }

  //update the submission state
  submissionRef.set('state', submissionState);

  //connect review and submission
  submissionRef.set('review', request.object);

  //save the submission
  await submissionRef.save(null, { useMasterKey: true });

  //notif
  const bountyId = submissionRef.get('bountyId');
  const userId = submissionRef.get('owner');
  const users = [userId];
  const message = 'Your submission has been reviewed';
  const BASE_URL = await GetBaseUrl();
  const url = `${BASE_URL}/bounty/${bountyId}/${submissionId}`;
  await CreateNotification(users, message, url);
});
