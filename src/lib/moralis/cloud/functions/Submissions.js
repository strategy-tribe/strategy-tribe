Moralis.Cloud.define('canSubmit', async (request) => {
  const { userId, bountyId } = request.params;
  IsAuthorized(request, userId);

  const { userSubmittedTooSoon, bountyIsClosed, spacesLeft } =
    await UserCanSubmitChecks(userId, bountyId);

  return {
    canSubmit: !userSubmittedTooSoon && !bountyIsClosed,
    spacesLeft,
  };
});

Moralis.Cloud.define('submissionsPerDay', async () => {
  const submissionsPerDay = await GetSubmissionsPerDay();

  return {
    submissionsPerDay,
  };
});
