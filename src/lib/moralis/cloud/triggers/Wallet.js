Moralis.Cloud.beforeDelete(WALLET_TABLE, async function (request) {
  try {
    const { object: wallet } = request;
    await ArchiveWallet(wallet);
  } catch (error) {
    ERROR(
      `Unabled to delete wallet. Unabled to archived wallet. Reason: "${error}"`,
      true
    );
  }
});

Moralis.Cloud.beforeSave('Wallet', async function (request) {
  const { object: wallet } = request;
  const address = wallet.get('address');

  try {
    const chainPrefix = titleCase(await GetChainPrefix());
    const funcName = `watch${chainPrefix}Address`;

    await Moralis.Cloud.run(
      funcName,
      {
        address: address,
        syncHistorical: false,
      },
      { useMasterKey: true }
    );
  } catch (error) {
    const reason = JSON.stringify(error);
    ERROR(`Error watching address ${address}.\nReason: ${reason}`, true);
  }
});
