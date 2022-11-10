import { EtherscanProvider } from '@ethersproject/providers';
import { ethers } from 'ethers';

export async function getBalance(address: string) {
  const provider = new EtherscanProvider('matic');
  const etherBalance = await provider.getBalance(address);
  const balance = ethers.utils.formatEther(etherBalance);
  return balance;
}
