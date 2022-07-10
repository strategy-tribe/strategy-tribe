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
  LOG(`The count is ${count}`);
  return count;
}

async function UserCanSubmitChecks(userId, bountyId) {
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
      bountyState === 'Closed' ||
      bountyState === 'Payment needed' ||
      !theresTimeLeft;
    LOG(
      `Bounty state: ${bountyState} / ClosesAt: ${closesAt} / theresTimeLeft : ${theresTimeLeft}`
    );
  }

  //*2- check if user hasn't uploaded in a day
  const latestSubmission = await GetLatestUserSubmisson(userId, bountyId);
  LOG(`latestSubmission exists: ${!!latestSubmission}`);

  let userHasUploadedInLessThanADay = false;

  if (latestSubmission) {
    const today = new Date();
    const diff = today.getTime() - latestSubmission.get('createdAt').getTime();
    const aDayInMs = 1000 * 60 * 60 * 24;
    const diffOfDays = diff / aDayInMs;

    userHasUploadedInLessThanADay = diffOfDays < 1;
    LOG(
      `diff: ${diff} / diffOfDays: ${diffOfDays} / userHasUploadedInLessThanADay: ${userHasUploadedInLessThanADay}`
    );
  }

  return {
    userHasUploadedInLessThanADay,
    bountyIsClosed,
  };
}
