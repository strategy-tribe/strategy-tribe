Moralis.Cloud.beforeSave(ORG_TABLE, async function (request) {
  const { object: organization } = request;
});

Moralis.Cloud.afterSave(ORG_TABLE, async function (request) {
  const { object: organization } = request;

  //*check if the org has a subs table
  const name = organization.get('name');
  let orgSubsRef = await GetOrgSubsRef(name);

  if (!orgSubsRef) {
    orgSubsRef = new Moralis.Object(ORG_SUBS_TABLE);
    orgSubsRef.set('name', name);
    orgSubsRef.set('subs', []);
    orgSubsRef.set('orgId', organization.id);

    const acl = new Moralis.ACL();
    acl.setPublicWriteAccess(false);
    acl.setPublicReadAccess(false);

    acl.setRoleWriteAccess(STAFF_ROLE, false);
    acl.setRoleReadAccess(STAFF_ROLE, true);

    acl.setRoleWriteAccess(ADMIN_ROLE, false);
    acl.setRoleReadAccess(ADMIN_ROLE, true);

    orgSubsRef.setACL(acl);
    await orgSubsRef.save(null, { useMasterKey: true });
  }

  //*check if the org has a wallet
  let wallet = organization.get('wallet');

  if (!wallet) {
    const wallet = await CreateWallet('org', organization.id);
    organization.set('wallet', wallet);
    organization.set('funds', 0);
    await organization.save(null, { useMasterKey: true });
  }

  //*Check that the countries in the bounties are the same as in the org
  await CheckBountiesCountries(organization);
});

Moralis.Cloud.beforeDelete(ORG_TABLE, async function (request) {
  const { object: organization } = request;

  const q = new Moralis.Query(ORG_SUBS_TABLE);
  const orgName = organization.get('name');
  q.equalTo('name', orgName);

  orgSub = await q.find({ useMasterKey: true });
  if (!orgSub) {
    ERROR(`Can't delete ${orgName}, could not find the sub entry`);
  }

  try {
    await orgSub.destroy();
  } catch (error) {
    ERROR(`Can't delete ${orgName}, Error: ${error}`);
  }
});

Moralis.Cloud.afterDelete(ORG_TABLE, async function (request) {
  const { object: organization } = request;

  const address = organization.get('wallet');

  await UnassignWallet(address);
});
