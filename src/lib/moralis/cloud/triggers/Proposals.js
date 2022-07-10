//*Bounties
Moralis.Cloud.beforeSave(BOUNTY_TABLE, async function (request) {
  const { object: bounty } = request;

  //Check for funds and state
  if (bounty.get('funds') > 0 && bounty.get('state') === 'Waiting for funds') {
    bounty.set('state', 'Open');
  }

  if (bounty.get('state') !== 'Open') {
    const bountyACL = new Moralis.ACL();
    bountyACL.setPublicReadAccess(false);
    bountyACL.setPublicWriteAccess(false);
    bountyACL.setRoleWriteAccess('staff', true);
    bountyACL.setRoleReadAccess('staff', true);
    bounty.setACL(bountyACL);
  } else {
    const bountyACL = new Moralis.ACL();
    bountyACL.setPublicReadAccess(true);
    bountyACL.setPublicWriteAccess(false);
    bountyACL.setRoleWriteAccess('staff', true);
    bountyACL.setRoleReadAccess('staff', true);
    bounty.setACL(bountyACL);
  }
});

Moralis.Cloud.afterSave(BOUNTY_TABLE, async function (request) {
  const { object: bounty, context } = request;

  //Check for wallet
  if (bounty.get('wallet') === '') {
    //add the wallet to the bounty
    const wallet = await CreateWallet('bounty', bounty.id);
    bounty.set('wallet', wallet);
  }

  if (bounty.get('state') === 'Open' && context.isNew) {
    // LOG(`New bounty created. Notifying subscribers`);
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
      `${BASE_URL}app/bounty/${bounty.id}`
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
    // LOG(`${orgName} +1 bounty`);
    await orgRef.save(null, { useMasterKey: true });
  } catch (error) {
    ERROR(
      `Error tried incrementing of a organization that does not exists: ${error}`
    );
  }
}
