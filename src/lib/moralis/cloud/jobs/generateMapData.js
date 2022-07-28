Moralis.Cloud.job('generateMapData', async () => {
  await generateMapData();
  await revalidateClientMap();
});

async function generateMapData() {
  try {
    LOG('Starting to generate map data');
    const q = new Moralis.Query(ORG_TABLE);

    const limit = (await GetBountyCount()) + 1;
    LOG(`Limit is : ${limit}`);
    q.limit(limit);

    const organizations = await q.find();

    //make them unique
    const countries = [
      ...new Set(
        organizations.reduce((acc, curr) => {
          return [...acc, ...curr.get('countries')];
        }, [])
      ),
    ];

    const countriesDataArray = [];
    for (const country of countries) {
      const { fundsInBounties, numOfBounties } = await getFundsInBountiesFor(
        country,
        limit
      );
      const numOfOrgs = organizations.filter((org) =>
        org.get('countries').includes(country)
      ).length;

      const countryData = {
        id: country,
        bounties: numOfBounties,
        organizations: numOfOrgs,
        totalFunds: fundsInBounties,
      };
      countriesDataArray.push(countryData);

      if (country === 'rus' || country === 'RUS') {
        LOG(`RUSSIA DATA:\n${JSON.stringify(countryData, null, 2)}`);
      }
    }

    const mapDataRef = new Moralis.Object(MAP_DATA_TABLE);
    mapDataRef.set('stats', countriesDataArray);

    const acl = new Moralis.ACL();

    acl.setPublicWriteAccess(false);
    acl.setPublicReadAccess(true);

    acl.setRoleWriteAccess(STAFF_ROLE, false);
    acl.setRoleReadAccess(STAFF_ROLE, true);

    acl.setRoleWriteAccess(ADMIN_ROLE, false);
    acl.setRoleReadAccess(ADMIN_ROLE, true);
    mapDataRef.setACL(acl);

    await mapDataRef.save(null, { useMasterKey: true });
  } catch (error) {
    ERROR(`Error generating map data: ${error}`);
  }
}

async function getFundsInBountiesFor(countryId, limit) {
  try {
    const bountyQuery = new Moralis.Query(BOUNTY_TABLE);
    bountyQuery.equalTo('countries', countryId);
    bountyQuery.limit(limit);
    const bountiesInCountry = await bountyQuery.find();

    const fundsArray = bountiesInCountry.map((bountyRef) =>
      bountyRef.get('funds')
    );

    const fundsInBounties = fundsArray.reduce((acc, curr) => (acc += curr));

    if (!fundsInBounties) {
      return { fundsInBounties: 0, numOfBounties: 0 };
    }
    return { fundsInBounties, numOfBounties: bountiesInCountry.length };
  } catch (error) {
    ERROR(
      `Error getting the funds in bounties for ${countryId}. Error: ${JSON.stringify(
        error
      )}`
    );
    return { fundsInBounties: 0, numOfBounties: 0 };
  }
}

async function revalidateClientMap() {
  try {
    const endpoint = await GetRevalidateEndpoint();

    await Moralis.Cloud.httpRequest({
      url: endpoint,
    });
    LOG('Revalidated client');
  } catch (error) {
    ERROR(`Error revalidating client.\nReason:\n${JSON.stringify(error)}`);
  }
}
