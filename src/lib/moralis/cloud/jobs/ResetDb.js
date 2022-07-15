Moralis.Cloud.job('resetDb', async (request) => {
  const tables = [
    ORG_TABLE,
    ORG_SUBS_TABLE,
    BOUNTY_TABLE,
    SUBMISSIONS_TABLE,
    REVIEWS_TABLE,
    TRANSACTIONS_TABLE,
    RECORDS_TABLE,
    MAP_DATA_TABLE,
    NOTIFICATIONS_TABLE,
    INVOICE_TABLE,
    WALLET_TABLE,
  ];

  LOG(`Ran reset db`);
  for await (const table of tables) {
    const q = new Moralis.Query(table);
    const items = await q.find({ useMasterKey: true });

    LOG(`${items.length} items in ${table}`);

    for await (const item of items) {
      await item.destroy({ useMasterKey: true });
    }
  }
  LOG(`DB reseted`);
});
