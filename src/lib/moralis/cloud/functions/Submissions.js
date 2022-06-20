Moralis.Cloud.define('canSubmit', async (request) => {
  const { userId, bountyId } = request.params;
  const { userHasUploadedInLessThanADay, bountyIsClosed } =
    await UserCanSubmitChecks(userId, bountyId);

  LOG(`Can user submit? ${!userHasUploadedInLessThanADay && !bountyIsClosed}`);

  return !userHasUploadedInLessThanADay && !bountyIsClosed;
});
