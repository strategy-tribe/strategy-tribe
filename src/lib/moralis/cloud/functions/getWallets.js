Moralis.Cloud.define('getWallets', async () => {
  try {
    const q = new Moralis.Query(WALLET_TABLE);
    const wallets = await q.find();
    return wallets;
  } catch (error) {
    ERROR(`Error fetching wallets. Reason: ${error}`);
  }
});
