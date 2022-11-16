import { EtherscanProvider } from '@ethersproject/providers';
import { PrismaClient } from '@prisma/client';
import { ethers } from 'ethers';

import { ERROR } from './utils';

export async function UpdateBalance(prisma: PrismaClient) {
  try {
    const provider = new EtherscanProvider('matic');
    const wallets = await prisma.wallet.findMany();
    for await (const wallet of wallets) {
      const etherBalance = await provider.getBalance(wallet.address);
      const balance = ethers.utils.formatEther(etherBalance);
      await prisma.wallet.update({
        where: {
          address: wallet.address,
        },
        data: {
          balance: parseFloat(balance),
        },
      });
    }
  } catch (error) {
    ERROR(`Error updating balances: ${error}`);
  }
}
