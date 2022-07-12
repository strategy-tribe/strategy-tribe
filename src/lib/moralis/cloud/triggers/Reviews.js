//*Reviews

const ACCEPTED_STATE = 'Accepted';
const REJECTED_STATE = 'Rejected';
const WAITING_FOR_PAYMENT_STATE = 'Waiting for payment';

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
