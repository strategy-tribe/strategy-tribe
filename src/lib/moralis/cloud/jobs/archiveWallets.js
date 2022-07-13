Moralis.Cloud.job('archiveWallets', async (request) => {
  try {
    LOG(`Ran update wallets`);
    const q = new Moralis.Query(WALLET_TABLE);
    const wallets = await q.find({ useMasterKey: true });

    const promises = [];

    for (const wallet of wallets) {
      promises.push(ArchiveWallet(wallet));
    }

    //Archive
    await Promise.all(promises);
    LOG('Success archiving wallets');

    //Delete
    await Moralis.bulkDeleteMany(WALLET_TABLE, [{ filter: {} }]);
  } catch (error) {
    ERROR(`Error archiving wallets : ${error}`);
  }
});
