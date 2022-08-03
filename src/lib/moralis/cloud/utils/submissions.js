async function GetSubmissionByID(id) {
  let q = new Moralis.Query(SUBMISSIONS_TABLE);
  q.equalTo('objectId', id);
  return await q.first({ useMasterKey: true });
}

async function GetLatestUserSubmisson(userId, bountyId) {
  let q = new Moralis.Query(SUBMISSIONS_TABLE);
  q.equalTo('owner', userId);
  q.equalTo('bountyId', bountyId);
  q.descending('createdAt');
  return await q.first({ useMasterKey: true });
}

async function CountBountySubmissions(bountyId) {
  let q = new Moralis.Query(SUBMISSIONS_TABLE);
  q.equalTo('bountyId', bountyId);
  const count = await q.count({ useMasterKey: true });
  return count;
}

async function UserCanSubmitChecks(userId, bountyId) {
  if (!userId || !bountyId) {
    return {
      userHasUploadedInLessThanADay: true,
      bountyIsClosed: true,
    };
  }

  //*1- check if the bounty is still available
  const bounty = await GetBountyByID(bountyId);

  if (!bounty) {
    ERROR('Validation error: submission bounty was not found', true);
  }

  //check state
  const bountyState = bounty.get('state');

  //Check time date
  const closesAt = bounty.get('closesAt');

  let bountyIsClosed = false;

  if (!closesAt) {
    bountyIsClosed = false;
  } else {
    const today = new Date();
    const theresTimeLeft = today.getTime() < closesAt.getTime();

    bountyIsClosed =
      bountyState === BOUNTY_CLOSED_STATE ||
      bountyState === BOUNTY_PAYMENT_NEEDED_STATE ||
      !theresTimeLeft;
  }

  //*2- check if user hasn't uploaded in a day
  const latestSubmission = await GetLatestUserSubmisson(userId, bountyId);

  let userHasUploadedInLessThanADay = false;

  if (latestSubmission) {
    const today = new Date();
    const diff = today.getTime() - latestSubmission.get('createdAt').getTime();
    const aDayInMs = 1000 * 60 * 60 * 24;
    const diffOfDays = diff / aDayInMs;

    userHasUploadedInLessThanADay = diffOfDays < 1;
  }

  return {
    userHasUploadedInLessThanADay,
    bountyIsClosed,
  };
}
