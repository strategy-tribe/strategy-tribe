async function CheckBountiesCountries(orgRef) {
  const query = new Moralis.Query(BOUNTY_TABLE);

  const organizationName = orgRef.get('name');
  query.equalTo('organizationName', organizationName);

  const bounties = await query.find();

  if (!bounties || bounties?.length === 0) {
    LOG(
      `Bounties not found related to org: ${organizationName}. Updating nothing.`
    );
    return;
  }

  const updates = [];

  const countries = orgRef.get('countries');

  const setNewCountries = async (bounty) => {
    bounty.set('countries', countries);
    bounty.save(null, { useMasterKey: true });
  };

  for (const bounty of bounties) {
    if (bounty.get('countries') !== countries) {
      updates.push(setNewCountries(bounty));
    }
  }

  if (updates.length > 0) LOG(`Updating countries for bounties of ${orgName}`);

  await Promise.all(updates);
}

async function CalculateBountiesOnOrg(orgRef) {
  LOG(`Calculating new funds for org ${orgRef.get('name')}`);
  const query = new Moralis.Query(BOUNTY_TABLE);
  query.equalTo('organizationName', orgRef.get('name'));
  const bounties = await query.find();

  if (!bounties) {
    ERROR(`Error calculating bounties funds for ${orgRef.get('name')}`, true);
  }

  let amount = 0;
  for (const bounty of bounties) {
    amount = amount + bounty.get('funds');
  }

  orgRef.set('funds', amount);
  orgRef.save(null, { useMasterKey: true });
}
