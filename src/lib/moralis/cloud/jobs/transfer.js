/**
 * Transfers the funds from 1 wallet to another
 *
 * @param {string} to_address Receiver address
 * @param {string} send_account Sender address
 * @param {string} private_key Sender address private key
 */
async function TransferFunds(to_address, send_account, private_key) {
  const chainCode = await GetChainCode();
  const { ethers, provider } = Moralis.ethersByChain(chainCode);

  //Grab wallet instance
  let wallet = new ethers.Wallet(private_key);

  //Connect to providers
  let walletSigner = wallet.connect(provider);

  const gasPrice = window.provider.getGasPrice();

  //! Grab the current funds from the wallet
  const bigNumBalance = await provider.getBalance(address);
  const balanceInString = ethers.utils.formatEther(bigNumBalance);
  const transferAmount = ethers.utils.parseEther(balanceInString);

  const tx = {
    from: send_account,
    to: to_address,
    value: transferAmount,
    nonce: window.provider.getTransactionCount(send_account, 'latest'),
    gasLimit: ethers.utils.hexlify(21000), // 0x21000?
    gasPrice: gasPrice,
  };

  const transaction = await walletSigner.sendTransaction(tx);

  LOG(`Transfer done`);
}
