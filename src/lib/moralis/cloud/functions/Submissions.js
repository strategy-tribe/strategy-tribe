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

Moralis.Cloud.define('getSubmitterStats', async (request) => {
  const { isAdmin, isStaff } = await GetUserRole(request.user.id, request);

  if (!isAdmin && !isStaff) {
    ERROR('Unauthorized: user must have higher auth', false);
    throw { error: 'Unauthorized: user must have higher auth' };
  }
  const { submitterId, bountyId } = request.params;

  let q = new Moralis.Query(SUBMISSIONS_TABLE);
  q.equalTo('owner', submitterId);
  const totalSubmissions = await q.count({ useMasterKey: true });

  q.equalTo('bountyId', bountyId);
  const subsToThisBounty = await q.count({ useMasterKey: true });

  const submissionsPerDay = await GetSubmissionsPerDay();
  const { spacesOccupied } = await GetUserSubmissionsLeft(
    submitterId,
    bountyId,
    submissionsPerDay
  );

  const spacesLeft = submissionsPerDay - spacesOccupied;

  return {
    totalSubmissions,
    subsToThisBounty,
    spacesLeft,
    canSubmitAgain: spacesOccupied < submissionsPerDay,
  };
});
