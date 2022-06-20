async function CreateWallet(type) {
  const chainCode = await GetChainCode();
  const { ethers } = Moralis.ethersByChain(chainCode);

  const wallet = ethers.Wallet.createRandom();

  //!save the wallet info in a table
  const walletRef = new Moralis.Object(WALLET_TABLE);
  walletRef.set('address', wallet.address.toLowerCase());
  walletRef.set('privateKey', wallet.privateKey.toLowerCase());
  walletRef.set('mnemonic', wallet.mnemonic.phrase.toLowerCase());
  walletRef.set('type', type);

  //security --- can only read
  const acl = new Moralis.ACL();
  acl.setPublicReadAccess(false);
  acl.setPublicWriteAccess(false);
  acl.setRoleWriteAccess('staff', false);
  acl.setRoleReadAccess('staff', true);
  walletRef.setACL(acl);

  //!Save the wallet
  await walletRef.save(null, { useMasterKey: true });

  //!Set the server to watch this addresses
  await Moralis.Cloud.run(
    'watchEthAddress',
    {
      address: wallet.address,
    },
    { useMasterKey: true }
  );

  return wallet.address.toLowerCase();
}

//*Bounties
Moralis.Cloud.beforeSave(BOUNTY_TABLE, async function (request) {
  const { object: bounty } = request;

  //Check for wallet
  if (bounty.get('wallet') === '') {
    //add the wallet to the bounty
    const wallet = await CreateWallet('bounty');
    bounty.set('wallet', wallet);
  }

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

  if (bounty.get('state') === 'Open' && context.isNew) {
    LOG(`New bounty created. Notifying subscribers`);
    const orgName = bounty.get('organizationName');

    await IncrementOrganizationCount(orgName);

    const orgSubsRef = await GetOrgSubsRef(orgName);
    if (!orgSubsRef) {
      throw `How does ${orgName} doesnt have a subs table?`;
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

async function IncrementOrganizationCount(orgName) {
  //see if the org exists
  let q = new Moralis.Query(ORG_TABLE);
  q.equalTo('name', orgName);
  let orgRef = await q.first({ useMasterKey: true });
  try {
    orgRef.increment('bounties');
    LOG(`${orgName} +1 bounty`);
    await orgRef.save(null, { useMasterKey: true });
  } catch (error) {
    throw 'Tried incrementing of a organization that does not exists';
  }
}
