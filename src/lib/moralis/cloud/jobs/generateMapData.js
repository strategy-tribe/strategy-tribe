Moralis.Cloud.job('generateMapData', async () => {
  await generateMapData();
  await revalidateClientMap();
});

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
      ERROR(`No funds for ${countryId}`);
      return 0;
    }
    return fundsInBounties;
  } catch (error) {
    ERROR(
      `Error getting the funds in bounties for ${countryId}. Error: ${JSON.stringify(
        error
      )}`
    );
    return 0;
  }
}

async function generateMapData() {
  try {
    LOG('Starting to generate map data');
    const q = new Moralis.Query(ORG_TABLE);

    const limit = (await GetBountyCount()) + 1;
    LOG(`Limit is : ${limit}`);
    q.limit(limit);

    const organizations = await q.find();

    const countriesDataArray = [];

    for (const org of organizations) {
      const orgCountries = org.get('countries');

      for (const countryId of orgCountries) {
        let countryData = countriesDataArray.find((c) => c.id === countryId);

        const fundsInBounties = await getFundsInBountiesFor(countryId, limit);

        if (countryData) {
          countryData.bounties += org.get('bounties');
          countryData.totalFunds += fundsInBounties;
          countryData.organizations++;
        } else {
          countryData = {
            id: countryId,
            bounties: org.get('bounties'),
            totalFunds: fundsInBounties,
            organizations: 1,
          };
          countriesDataArray.push(countryData);
        }
      }

      LOG(
        `checked organizations (${organizations.indexOf(org) + 1}/${
          organizations.length
        }).\n${countriesDataArray.length} countries.`
      );
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
