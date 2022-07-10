Moralis.Cloud.beforeSave(ORG_TABLE, async function (request) {
  const { object: organization } = request;

  //*check if the org has a subs table
  const name = organization.get('name');
  let orgSubsRef = await GetOrgSubsRef(name);

  if (!orgSubsRef) {
    // LOG(`Creating subs object for "${name}"`);
    orgSubsRef = new Moralis.Object(ORG_SUBS_TABLE);
    orgSubsRef.set('name', name);
    orgSubsRef.set('subs', []);

    const acl = new Moralis.ACL();
    acl.setPublicReadAccess(false);
    acl.setPublicWriteAccess(false);
    acl.setRoleWriteAccess('staff', false);
    acl.setRoleReadAccess('staff', true);
    orgSubsRef.setACL(acl);
    await orgSubsRef.save(null, { useMasterKey: true });
  }
});

Moralis.Cloud.afterSave(ORG_TABLE, async function (request) {
  const { object: organization } = request;

  //*check if the org has a wallet
  let wallet = organization.get('wallet');

  if (!wallet) {
    const wallet = await CreateWallet('org', organization.id);
    organization.set('wallet', wallet);
    organization.set('funds', 0);
  }
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
