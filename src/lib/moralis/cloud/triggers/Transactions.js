//*Transactions
Moralis.Cloud.afterSave(TRANSACTIONS_TABLE, async function (request) {
  const from = request.object.get('from_address');
  const to = request.object.get('to_address');

  await TrytoUpdate(from);
  await TrytoUpdate(to);
});

async function TrytoUpdate(address) {
  let q = new Moralis.Query(WALLET_TABLE);
  q.equalTo('address', address);
  const walletObj = await q.first({ useMasterKey: true });

  if (!walletObj) {
    ERROR(`wallet not found (${address})`);
    return;
  }

  const type = walletObj.get('type');
  let table = '';
  if (type === 'bounty') table = BOUNTY_TABLE;
  else if (type === 'org') table = ORG_TABLE;
  else {
    ERROR(`The type of the bounty was not defined`);
    return undefined;
  }

  const objQuery = new Moralis.Query(table);
  objQuery.equalTo('wallet', address);
  obj = await objQuery.first({ useMasterKey: true });

  await UpdateObjectWallet(obj, address);

  if (type === 'bounty') {
    const orgName = obj.get('organizationName');

    const orgQuery = new Moralis.Query(ORG_TABLE);
    orgQuery.equalTo('name', orgName);
    const orgRef = await orgQuery.first();

    if (!orgRef) {
      ERROR(`Org (${orgName}) not found when updating transactions`);
      return;
    }

    await CalculateBountiesOnOrg(orgRef);
  }
}

async function UpdateObjectWallet(obj, address) {
  try {
    const chainCode = await GetChainCode();
    const { ethers, provider } = Moralis.ethersByChain(chainCode);
    const bigNumbalance = await provider.getBalance(address);
    const balanceInString = ethers.utils.formatEther(bigNumbalance);

    const balance = Number.parseFloat(balanceInString);

    const oldBalance = obj.get('funds');
    if (balance !== oldBalance) {
      obj.set('funds', balance);
      await obj.save(null, { useMasterKey: true });
    }

    return balance;
  } catch (error) {
    ERROR(`Running UpdateObjectWallet. Reason:\n${error}`, true);
  }
}
