//Helpers
function titleCase(str) {
  var splitStr = str.toLowerCase().split(' ');
  for (var i = 0; i < splitStr.length; i++) {
    // You do not need to check if i is larger than splitStr length, as your for does that for you
    // Assign it back to the array
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  // Directly return the joined string
  return splitStr.join(' ');
}

function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

async function CreateNotification(users, message, url) {
  LOG(`New notification: ${message}`);

  const { APP_ID, KEY_APP_KEY } = await GetOneSignalKeys();
  const data = {
    app_id: APP_ID,
    contents: { en: message },
    include_external_user_ids: users,
    url,
  };

  Moralis.Cloud.httpRequest({
    method: 'POST',
    url: 'https://onesignal.com/api/v1/notifications',
    body: data,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${KEY_APP_KEY}`,
    },
  });
}

async function GetChainCode() {
  const config = await Moralis.Config.get({ useMasterKey: true });
  const chainCode = config.get('CHAIN_CODE');
  return chainCode;
}

async function GetBaseUrl() {
  const config = await Moralis.Config.get({ useMasterKey: true });
  const chainCode = config.get('BASE_URL');
  return chainCode;
}

async function GetOneSignalKeys() {
  const config = await Moralis.Config.get({ useMasterKey: true });
  const APP_ID = config.get('APP_ID');
  const KEY_APP_KEY = config.get('KEY_APP_KEY');
  return { APP_ID, KEY_APP_KEY };
}

async function GetSheetUrl() {
  const config = await Moralis.Config.get({ useMasterKey: true });
  const url = config.get('SHEET_URL');
  return { url };
}

async function SendNotification(usersIds, message) {
  const { APP_ID, KEY_APP_KEY } = await GetOneSignalKeys();
  const data = {
    app_id: APP_ID,
    contents: { en: message },
    include_external_user_ids: usersIds,
  };

  Moralis.Cloud.httpRequest({
    method: 'POST',
    url: 'https://onesignal.com/api/v1/notifications',
    body: data,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${KEY_APP_KEY}`,
    },
  });
}

async function GetOrgSubsRef(orgName) {
  const q = new Moralis.Query(ORG_SUBS_TABLE);
  q.equalTo('name', orgName);
  return await q.first({ useMasterKey: true });
}

function LOG(msg) {
  const logger = Moralis.Cloud.getLogger();
  logger.info(`----> ${msg}`);
}

async function GetBountyByID(id) {
  let q = new Moralis.Query(BOUNTY_TABLE);
  q.equalTo('objectId', id);
  return await q.first({ useMasterKey: true });
}
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
    LOG('submission bounty was not found');
    throw 'validation error';
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
