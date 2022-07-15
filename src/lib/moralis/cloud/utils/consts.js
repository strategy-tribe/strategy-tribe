async function GetChainCode() {
  const config = await Moralis.Config.get({ useMasterKey: true });
  const chainCode = config.get('CHAIN_CODE');
  return chainCode;
}

async function GetChainPrefix() {
  const config = await Moralis.Config.get({ useMasterKey: true });
  const chainCode = config.get('CHAIN_PREFIX');
  return chainCode;
}

async function GetBaseUrl() {
  const config = await Moralis.Config.get({ useMasterKey: true });
  const chainCode = config.get('BASE_URL');
  return chainCode;
}

async function GetOneSignalKeys() {
  const config = await Moralis.Config.get({ useMasterKey: true });
  const APP_ID = config.get('APP_ID');
  const KEY_APP_KEY = config.get('KEY_APP_KEY');
  return { APP_ID, KEY_APP_KEY };
}

async function GetSheetUrl() {
  const config = await Moralis.Config.get({ useMasterKey: true });
  const url = config.get('SHEET_URL');
  return { url };
}
