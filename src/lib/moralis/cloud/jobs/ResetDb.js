Moralis.Cloud.job('resetDb', async (request) => {
  LOG(`Ran reset db`);
  await Moralis.bulkDeleteMany(ORG_SUBS_TABLE, [{ filter: {} }]);
  await Moralis.bulkDeleteMany(ORG_TABLE, [{ filter: {} }]);
  // await Moralis.bulkDeleteMany(WALLET_TABLE, [{ filter: {} }]);
  await Moralis.bulkDeleteMany(ROLES_TABLE, [{ filter: {} }]);
  await Moralis.bulkDeleteMany(BOUNTY_TABLE, [{ filter: {} }]);
  await Moralis.bulkDeleteMany(SUBMISSIONS_TABLE, [{ filter: {} }]);
  await Moralis.bulkDeleteMany(REVIEWS_TABLE, [{ filter: {} }]);
  await Moralis.bulkDeleteMany(TARGETS_TABLE, [{ filter: {} }]);
  await Moralis.bulkDeleteMany(TRANSACTIONS_TABLE, [{ filter: {} }]);
  await Moralis.bulkDeleteMany(RECORDS_TABLE, [{ filter: {} }]);
});
