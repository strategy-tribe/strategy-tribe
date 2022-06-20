Moralis.Cloud.define('getMapStats', async (request) => {
  const q = new Moralis.Query(MAP_DATA_TABLE);
  q.descending('createdAt');
  const mapDataOfToday = await q.first();
  return mapDataOfToday;
});

Moralis.Cloud.job('generateMapData', async (request) => {
  const q = new Moralis.Query(BOUNTY_TABLE);
  q.limit(5000);
  const bounties = await q.find();

  const regions = [];
  for (const bounty of bounties) {
    let region = regions.find((r) => r.name === bounty.get('region'));
    if (region) {
      region.amountOfBounties++;
      region.bounty += bounty.get('funds');
    } else {
      region = {
        name: bounty.get('region'),
        countries: [],
        amountOfBounties: 1,
        bounty: bounty.get('funds'),
      };
      regions.push(region);
    }
  }

  const mapDataRef = new Moralis.Object(MAP_DATA_TABLE);
  mapDataRef.set('stats', regions);

  const acl = new Moralis.ACL();
  acl.setPublicReadAccess(true);
  acl.setPublicWriteAccess(false);
  acl.setRoleWriteAccess('staff', false);
  acl.setRoleReadAccess('staff', true);
  mapDataRef.setACL(acl);

  await mapDataRef.save(null, { useMasterKey: true });
});

// type RegionStats = {
//   region: string,
//   bountiesIds: string[],
//   bounty: number,
// };

// type MapData = {
//   id: string,
//   createdAt: Date,
//   stats: RegionStats[],
// };
