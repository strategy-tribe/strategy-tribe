Moralis.Cloud.job('resetDb', async (request) => {
  const tables = [
    BOUNTY_TABLE,
    SUBMISSIONS_TABLE,
    REVIEWS_TABLE,
    ORG_SUBS_TABLE,
    ORG_TABLE,
    TRANSACTIONS_TABLE,
    MAP_DATA_TABLE,
    NOTIFICATIONS_TABLE,
    INVOICE_TABLE,
    WALLET_TABLE,
    RECORDS_TABLE,
  ];

  LOG(`Ran reset db`);
  for await (const table of tables) {
    try {
      const q = new Moralis.Query(table);
      q.limit(100000);
      const items = await q.find({ useMasterKey: true });

      LOG(`${items.length} items in ${table}`);

      const deletes = [];

      for (const item of items) {
        deletes.push(await item.destroy({ useMasterKey: true }));
      }

      await Promise.all(deletes);
    } catch (error) {
      LOG(`Error resetting ${table}`);
    }
  }
  LOG(`DB reseted`);
});
