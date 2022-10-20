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
    //get the wallet
    const q = new Moralis.Query('Wallet');
    q.equalTo('address', address);
    const walletRef = await q.first({ useMasterKey: true });

    if (!walletRef) {
      throw new Error(
        'Trying to obtain the balance of a wallet that does not exists in the db'
      );
    }

    const newBalance = await GrabBalance(address);

    //set it to the object (obj = Bounty / Org)
    const funds = obj.get('funds');
    if (newBalance !== funds) {
      obj.set('funds', newBalance);
      await obj.save(null, { useMasterKey: true });
    }

    //set it to the walletRef
    const balance = walletRef.get('funds');
    if (newBalance !== balance) {
      walletRef.set('balance', newBalance);
      await walletRef.save(null, { useMasterKey: true });
    }

    return balance;
  } catch (error) {
    ERROR(`Running UpdateObjectWallet. Reason:\n${error}`, true);
  }
}
