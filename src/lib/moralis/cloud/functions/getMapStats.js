Moralis.Cloud.define('getMapStats', async () => {
  LOG('Asking for map data');
  const q = new Moralis.Query(MAP_DATA_TABLE);
  q.descending('createdAt');
  const mapDataOfToday = await q.first();
  return mapDataOfToday;
});
