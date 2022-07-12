//*Reviews
Moralis.Cloud.afterSave(REVIEWS_TABLE, async function (request) {
  //*Connect the review and the submission
  //get the submission
  const submissionId = request.object.get('submissionId');
  const submissionRef = await GetSubmissionByID(submissionId);
  if (!submissionRef) {
    ERROR('Validation error: Submission not found');
  }
  const bountyId = submissionRef.get('bountyId');
  //update the submission state
  let submissionState = 'was not accepted';
  if (request.object.get('grade') === 'was fully accepted')
    submissionState = "was accepted and it's waiting for payment";
  submissionRef.set('state', submissionState);
  //connect review and submission
  submissionRef.set('review', request.object);
  //save the submission
  await submissionRef.save(null, { useMasterKey: true });

  const userId = submissionRef.get('owner');
  const users = [userId];
  const message = 'Your submission has been reviewed';
  const BASE_URL = await GetBaseUrl();
  const url = `${BASE_URL}/bounty/${bountyId}/${submissionId}`;
  await CreateNotification(users, message, url);
});
