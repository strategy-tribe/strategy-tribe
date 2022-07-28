Moralis.Cloud.job('calculateFunds', async (request) => {
  const orgQuery = new Moralis.Query(ORG_TABLE);
  const orgs = await orgQuery.find();
  LOG('Calculating funds for orgs');
  for await (const org of orgs) {
    await CalculateBountiesOnOrg(org);
  }
  LOG('Done calculating funds for orgs');
});
