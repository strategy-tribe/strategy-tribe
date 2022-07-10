Moralis.Cloud.beforeDelete(WALLET_TABLE, async function (request) {
  try {
    const { object: wallet } = request;
    await ArchiveWallet(wallet);
  } catch (error) {
    ERROR(`Unabled to archived wallet. Reason: "${error}"`, true);
  }
});
