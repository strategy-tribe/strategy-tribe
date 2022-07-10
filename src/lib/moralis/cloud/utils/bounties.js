async function GetBountyByID(id) {
  let q = new Moralis.Query(BOUNTY_TABLE);
  q.equalTo('objectId', id);
  return await q.first({ useMasterKey: true });
}

async function GetBountyCount() {
  let q = new Moralis.Query(BOUNTY_TABLE);
  const amount = await q.count({ useMasterKey: true });
  return amount;
}
