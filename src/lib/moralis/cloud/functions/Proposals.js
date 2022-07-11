Moralis.Cloud.define('getBountiesIds', async (request) => {
  const q = new Moralis.Query(BOUNTY_TABLE);
  q.limit(3000);
  const bounties = await q.find();
  const ids = bounties.map((p) => p.id);

  return { ids };
});
