async function GenerateWallet() {
  const chainCode = await GetChainCode();
  const { ethers } = Moralis.ethersByChain(chainCode);

  const { address, privateKey, mnemonic } = ethers.Wallet.createRandom();

  return {
    address: address.toLowerCase(),
    privateKey: privateKey.toLowerCase(),
    mnemonic: mnemonic.phrase.toLowerCase(),
  };
}

async function CreateWallet(type, id) {
  try {
    const { address, privateKey, mnemonic } = await GenerateWallet();

    //!save the wallet info in a table
    const walletRef = new Moralis.Object(WALLET_TABLE);
    walletRef.set('address', address);
    walletRef.set('privateKey', privateKey);
    walletRef.set('mnemonic', mnemonic);

    walletRef.set('type', type);
    walletRef.set('assigned', id);

    //security --- can only read
    const acl = new Moralis.ACL();
    acl.setPublicReadAccess(false);
    acl.setPublicWriteAccess(false);

    acl.setRoleWriteAccess(STAFF_ROLE, false);
    acl.setRoleReadAccess(STAFF_ROLE, false);

    acl.setRoleWriteAccess(ADMIN_ROLE, false);
    acl.setRoleReadAccess(ADMIN_ROLE, true);

    walletRef.setACL(acl);

    //!Save the wallet
    await walletRef.save(null, { useMasterKey: true });

    return address;
  } catch (error) {
    ERROR(
      `Error creating wallet of type (${type}) and id (${id}). Reason: ${error}`,
      true
    );
  }
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
  LOG('Archiving wallet');
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

    acl.setRoleWriteAccess(STAFF_ROLE, false);
    acl.setRoleReadAccess(STAFF_ROLE, false);

    acl.setRoleWriteAccess(ADMIN_ROLE, false);
    acl.setRoleReadAccess(ADMIN_ROLE, true);

    archiveRef.setACL(acl);
    await archiveRef.save(null, { useMasterKey: true });
  } catch (error) {
    ERROR(
      `Error archiving wallet: ${wallet.get('address')}. Reason: ${error}`,
      true
    );
  }
}
