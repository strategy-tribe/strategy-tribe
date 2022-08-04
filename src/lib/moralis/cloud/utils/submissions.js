async function GetSubmissionByID(id) {
  let q = new Moralis.Query(SUBMISSIONS_TABLE);
  q.equalTo('objectId', id);
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
      userSubmittedTooSoon: true,
      bountyIsClosed: true,
      spacesLeft: 0,
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
  const submissionsPerDay = await GetSubmissionsPerDay();
  const { spacesOccupied } = await GetUserSubmissionsLeft(
    userId,
    bountyId,
    submissionsPerDay
  );
  const userSubmittedTooSoon = spacesOccupied >= submissionsPerDay;

  const spacesLeft = submissionsPerDay - spacesOccupied;
  return {
    userSubmittedTooSoon,
    bountyIsClosed,
    spacesLeft: spacesLeft > 0 ? spacesLeft : 0,
  };
}

async function GetUserSubmissionsLeft(userId, bountyId, submissionsPerDay) {
  let q = new Moralis.Query(SUBMISSIONS_TABLE);
  q.equalTo('owner', userId);
  q.equalTo('bountyId', bountyId);

  q.descending('createdAt');
  q.limit(submissionsPerDay);
  const subs = await q.find({ useMasterKey: true });

  const today = new Date();
  const spaces = [];

  subs.forEach((sub) => {
    const diff = today.getTime() - sub.get('createdAt').getTime();

    const hoursInMs = 1000 * 60 * 60 * submissionsPerDay;
    const diffOfDays = diff / hoursInMs;
    const occupiesSpace = diffOfDays < 1;

    spaces.push(occupiesSpace);
  });

  const spacesOccupied = spaces.filter((occupiesSpace) => occupiesSpace).length;

  return { spacesOccupied };
}
