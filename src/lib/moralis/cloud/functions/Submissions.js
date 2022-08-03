Moralis.Cloud.define('canSubmit', async (request) => {
  const { userId, bountyId } = request.params;
  IsAuthorized(request, userId);

  const { userHasUploadedInLessThanADay, bountyIsClosed } =
    await UserCanSubmitChecks(userId, bountyId);

  return !userHasUploadedInLessThanADay && !bountyIsClosed;
});
