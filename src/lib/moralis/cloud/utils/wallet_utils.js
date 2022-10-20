//* Wallet creation
/**
 * Assigns a wallet for a `Bounty` or `Organization`
 * @param {'bounty' | 'org'} type of the object that needs the wallet
 * @param {string} id id of the object that needs the wallet
 * @returns
 */
async function AssignWallet(type, id) {
  try {
    //check for an available wallet
    const availableWallet = await FindAvailableWallet();
    if (availableWallet) {
      //assign the wallet to the id
      availableWallet.set('assigned', id);
      await availableWallet.save(null, { useMasterKey: true });

      const address = availableWallet.get('address');
      return address;
    }

    //if not, create one
    const address = await CreateWallet(type, id);
    return address;
  } catch (error) {
    ERROR(
      `Error creating wallet of type (${type}) and id (${id}).\nReason: ${error}`,
      true
    );
  }
}

/** Looks for a wallet that is not assigned to any bounty/org and returns it. It looks for the one with the higher balance. It can return `undefined`*/
async function FindAvailableWallet() {
  const q = new Moralis.Query('Wallet');
  q.doesNotExist('assigned');
  q.limit(5000);
  q.descending('balance'); //grab the one with most money in it

  const wallet = await q.first({
    useMasterKey: true,
  });

  if (!wallet) return undefined;
  return wallet;
}

/**
 * Creates a wallet for a `Bounty` or `Organization`
 * @param {'bounty' | 'org'} type of the object that needs the wallet
 * @param {string} id id of the object that needs the wallet
 * @returns address of the created wallet
 */
async function CreateWallet(type, id) {
  const web3 = new Moralis.Web3(
    new Moralis.Web3.providers.HttpProvider('https://polygon-rpc.com')
  );
  const { address: rawAddress, privateKey } = web3.eth.accounts.create();

  const address = rawAddress.toLowerCase();

  //!save the wallet info in a table
  const walletRef = new Moralis.Object(WALLET_TABLE);
  walletRef.set('address', address);
  walletRef.set('privateKey', privateKey);
  walletRef.set('mnemonic', 'created w web3, no mnemonic available');
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
}

//!Wallet deletion
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

//* General utils
/**
 *  Fetches the balance of an address
 *  @param {string} address */
async function GrabBalance(address) {
  try {
    const chainCode = await GetChainCode();

    const options = {
      chain: chainCode,
      address: address,
    };
    const result = await Moralis.Web3API.account.getNativeBalance(options);

    if (!result) {
      throw new Error(
        'Unable to get a result from "Moralis.Web3API.account.getNativeBalance"'
      );
    }

    const balanceInEther = ConvertWeiToEther(result.balance, chainCode);
    if (balanceInEther > 0)
      LOG(`Balance above 0 (${balanceInEther}) for ${address} `);

    return balanceInEther;
  } catch (error) {
    ERROR(error, true);
  }
}

/**
 *  Converts a string of wei to ether
 *  @param {string} wei
 * @param {string} chainCode
 */
function ConvertWeiToEther(wei, chainCode) {
  try {
    const { ethers } = Moralis.ethersByChain(chainCode);
    const balanceInString = ethers.utils.formatEther(wei);
    const balance = Number.parseFloat(balanceInString);
    return balance;
  } catch (error) {
    ERROR(error, true);
  }
}

/**
 * Checks if a given address is already in the DB
 * @param {string} address
 */
async function CheckIfWalletIsInDbAlready(address) {
  const q = new Moralis.Query('Wallet');
  q.equalTo('address', address);
  const walletRef = await q.first({ useMasterKey: true });

  return !!walletRef;
}
