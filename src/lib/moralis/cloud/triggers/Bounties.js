//*Bounties
Moralis.Cloud.beforeSave(BOUNTY_TABLE, async function (request) {
  const { object: bounty, context } = request;

  LOG(`BOUNTY_TABLE beforeSave running\n ${request.object.id}`);

  //Check for funds and state
  if (bounty.get('state') === BOUNTY_PAYMENT_NEEDED_STATE) {
    //close it
    LOG(`Bounty to be closed detected.`);
    const submissionThatPassed = context.acceptedSubmissionID;
    if (!submissionThatPassed) {
      ERROR(
        `Error closing bounty. Did not get submission that closed it. ${JSON.stringify(
          request,
          null,
          2
        )}`
      );
    }
    await CloseBounty(bounty.id, submissionThatPassed);
    LOG(`Closed bounty`);
  } else if (
    bounty.get('funds') > 0 &&
    bounty.get('state') === BOUNTY_WAITING_FUNDS_STATE
  ) {
    bounty.set('state', BOUNTY_OPEN_STATE);
  } else if (bounty.get('funds') === 0) {
    bounty.set('state', BOUNTY_WAITING_FUNDS_STATE);
  }

  const bountyACL = new Moralis.ACL();

  bountyACL.setPublicWriteAccess(false);
  bountyACL.setPublicReadAccess(true);

  bountyACL.setRoleWriteAccess(STAFF_ROLE, false);
  bountyACL.setRoleReadAccess(STAFF_ROLE, true);

  bountyACL.setRoleWriteAccess(ADMIN_ROLE, false);
  bountyACL.setRoleReadAccess(ADMIN_ROLE, true);

  bounty.setACL(bountyACL);
  LOG(`BOUNTY_TABLE beforeSave done`);
});

Moralis.Cloud.afterSave(BOUNTY_TABLE, async function (request) {
  const { object: bounty, context } = request;

  //Check for wallet
  if (!bounty.get('wallet') || bounty.get('wallet') === '') {
    try {
      const wallet = await CreateWallet('bounty', bounty.id);
      bounty.set('wallet', wallet);
      await bounty.save(null, { useMasterKey: true });
    } catch (error) {
      ERROR(`Error creating wallet for bounty. Reason: ${error}`);
    }
  }
  if (context.isNew) {
    const orgName = bounty.get('organizationName');

    await IncrementOrganizationCount(orgName);

    const orgSubsRef = await GetOrgSubsRef(orgName);

    if (!orgSubsRef) {
      const msg = `How does ${orgName} doesnt have a subs table?`;
      ERROR(msg, true);
    }
    const subscribers = orgSubsRef.get('subs');

    const BASE_URL = await GetBaseUrl();

    await CreateNotification(
      subscribers,
      `New bounty on ${orgName}`,
      `${BASE_URL}/bounty/${bounty.id}`
    );
  }
});

Moralis.Cloud.afterDelete(BOUNTY_TABLE, async function (request) {
  const { object: bounty } = request;

  const address = bounty.get('wallet');

  await UnassignWallet(address);
});

async function IncrementOrganizationCount(orgName) {
  //see if the org exists
  let q = new Moralis.Query(ORG_TABLE);
  q.equalTo('name', orgName);
  let orgRef = await q.first({ useMasterKey: true });
  try {
    orgRef.increment('bounties');
    await orgRef.save(null, { useMasterKey: true });
  } catch (error) {
    ERROR(
      `Error tried incrementing of a organization that does not exists: ${error}`
    );
  }
}

async function CloseBounty(bountyId, exception) {
  LOG(`Closing bounty: ${bountyId}\nbc ${exception} got accepted`);

  const q = new Moralis.Query(SUBMISSIONS_TABLE);
  q.equalTo('bountyId', bountyId);
  q.notEqualTo('objectId', exception);

  const leftOverSubs = await q.find({ useMasterKey: true });

  const key = await GetKey();

  for (const sub of leftOverSubs) {
    const submissionId = sub.id;
    if (submissionId === exception) {
      ERROR('Exception not working...', false);
    } else {
      //create a review
      const userId = sub.get('owner');
      const grade = SUBMISSION_REJECTED_STATE;
      const reviewerComment =
        'Unfortunately, the bounty you submitted to already accepted submission. Please try again next time.';

      const reviewRef = new Moralis.Object(REVIEWS_TABLE);
      reviewRef.set('grade', grade);
      reviewRef.set('submissionId', submissionId);
      reviewRef.set('reviewerId', 'NONE');
      reviewRef.set('reviewerComment', reviewerComment);

      const context = {
        key,
        userId,
      };
      reviewRef.save(null, { useMasterKey: true, context });
    }
  }
}
