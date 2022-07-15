//*Bounties
Moralis.Cloud.beforeSave(BOUNTY_TABLE, async function (request) {
  const { object: bounty } = request;

  //Check for funds and state
  if (
    bounty.get('funds') > 0 &&
    bounty.get('state') === BOUNTY_WAITING_FUNDS_STATE
  ) {
    bounty.set('state', BOUNTY_OPEN_STATE);
  }

  const bountyACL = new Moralis.ACL();

  bountyACL.setPublicWriteAccess(false);
  bountyACL.setPublicReadAccess(true);

  bountyACL.setRoleWriteAccess(STAFF_ROLE, true);
  bountyACL.setRoleReadAccess(STAFF_ROLE, true);

  bountyACL.setRoleWriteAccess(ADMIN_ROLE, true);
  bountyACL.setRoleReadAccess(ADMIN_ROLE, true);

  bounty.setACL(bountyACL);
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
  if (bounty.get('state') === BOUNTY_OPEN_STATE && context.isNew) {
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
