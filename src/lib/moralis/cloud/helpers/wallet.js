async function CreateWallet(type, id) {
  const chainCode = await GetChainCode();
  const { ethers } = Moralis.ethersByChain(chainCode);

  const wallet = ethers.Wallet.createRandom();

  //!save the wallet info in a table
  const walletRef = new Moralis.Object(WALLET_TABLE);
  walletRef.set('address', wallet.address.toLowerCase());
  walletRef.set('privateKey', wallet.privateKey.toLowerCase());
  walletRef.set('mnemonic', wallet.mnemonic.phrase.toLowerCase());
  walletRef.set('type', type);

  walletRef.set('assigned', id);

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

async function UnassignWallet(address) {
  const q = new Moralis.Query(WALLET_TABLE);

  q.equalTo('address', address);

  const wallet = await q.first({ useMasterKey: true });

  if (!wallet) {
    ERROR(`Couldnt find this wallet: ${address}`, true);
  }

  wallet.set('assigned', undefined);

  await wallet.save(null, { useMasterKey: true });
}

async function ArchiveWallet(wallet) {
  try {
    const address = wallet.get('address');
    const type = wallet.get('type');
    const assigned = wallet.get('assigned');
    const privateKey = wallet.get('privateKey');
    const oldId = wallet.get('objectId');
    const deletedAt = new Date();
    const mnemonic = wallet.get('mnemonic');

    const archiveRef = new Moralis.Object(ARCHIVED_WALLET_TABLE);

    archiveRef.set('address', address);
    archiveRef.set('type', type);
    archiveRef.set('assigned', assigned);
    archiveRef.set('privateKey', privateKey);
    archiveRef.set('oldId', oldId);
    archiveRef.set('deletedAt', deletedAt);
    archiveRef.set('mnemonic', mnemonic);

    const acl = new Moralis.ACL();
    acl.setPublicReadAccess(false);
    acl.setPublicWriteAccess(false);
    acl.setRoleWriteAccess('staff', false);
    acl.setRoleReadAccess('staff', false);
    archiveRef.setACL(acl);
    await archiveRef.save(null, { useMasterKey: true });
  } catch (error) {
    ERROR(
      `Error archiving wallet: ${wallet.get('address')}. Reason: ${error}`,
      true
    );
  }
}
