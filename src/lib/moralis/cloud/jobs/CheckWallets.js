Moralis.Cloud.job('Check bounties wallets', async (request) => {
  async function CalculateBounties() {
    try {
      const query = new Moralis.Query(BOUNTY_TABLE);
      query.limit(10000);
      const bounties = await query.find();
      LOG(`${bounties.length} bounties`);

      let total = 0;

      for await (const bounty of bounties) {
        const wallet = bounty.get('wallet');
        total += await UpdateObjectWallet(bounty, wallet);
      }

      LOG(`Done updating wallets.\nTotal funds: ${total}`);
    } catch (error) {
      ERROR(`Running "Check bounties wallets". Reason:\n${error}`, true);
    }
  }

  async function CalculateOrgs() {
    try {
      const orgQuery = new Moralis.Query(ORG_TABLE);
      const orgs = await orgQuery.find();
      LOG('Calculating funds for orgs');
      for await (const org of orgs) {
        await CalculateBountiesOnOrg(org);
      }
      LOG('Done calculating funds for orgs');
    } catch (error) {
      ERROR(`Running "Check bounties wallets". Reason:\n${error}`, true);
    }
  }

  //! Order matters
  try {
    LOG(`Running "Check bounties wallets"`);
    await CalculateBounties();
    LOG(`Done bounties`);
    await CalculateOrgs();
    LOG(`Done orgs`);
    await Moralis.Cloud.run('Generate map data');
    LOG(`Done generating map data\nJob "Check bounties wallets" finished`);
  } catch (error) {
    LOG(`Running "Check bounties wallets". Reason:\n${error}`);
  }
});
