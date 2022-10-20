// Moralis.Cloud.job('FindAvailableWallet', async () => {
//   const address = await FindAvailableWallet();
//   LOG(address);
// });

/** Checks if the assignments of wallets are actually there. It also checks their balance. */
Moralis.Cloud.job('Find unassigned wallets', async () => {
  LOG('Running -> Find unassigned wallets');
  await FindUnassignedWallets();
  LOG('\nDone -> Find unassigned wallets');
});

async function FindUnassignedWallets() {
  //grab all of the wallets
  const q = new Moralis.Query('Wallet');
  q.limit(1500);
  const wallets = await q.find({ useMasterKey: true });

  LOG(`${wallets.length} wallets`);

  for await (const wallet of wallets) {
    const i = wallets.indexOf(wallet);
    if (i % 10 === 0) {
      LOG(`${i}/${wallets.length} wallets`);
    }
    await UpdateWallet(wallet);
  }
}

async function UpdateWallet(wallet) {
  const assignedId = wallet.get('assigned') ?? '';
  const qBounty = await new Moralis.Query('Bounty');
  qBounty.equalTo('objectId', assignedId);
  const bounty = await qBounty.first({ useMasterKey: true });

  const qOrg = await new Moralis.Query('Organization');
  qOrg.equalTo('objectId', assignedId);
  const org = await qOrg.first({ useMasterKey: true });

  if (!bounty && !org) {
    wallet.unset('assigned');
  }

  // check their balance and apply it
  const address = wallet.get('address');
  const balance = await GrabBalance(address);
  wallet.set('balance', balance);

  //save changes
  await wallet.save(null, { useMasterKey: true });
}
