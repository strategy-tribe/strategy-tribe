import { BountyState } from '@prisma/client';
import { ethers } from 'ethers';

import { ERROR, LOG } from '../importer/utils';
import prisma from '../prisma/prismaClient';

export async function IncrementBounty() {
  if (process.env.INCREMENT_BOUNTY === 'true') {
    try {
      await PeriodicBountyUpdate();
    } catch (error) {
      ERROR(`Error incrementing bounties: ${error}`);
    }
  }
  if (process.env.UPDATE_DONATIONS === 'true') {
    try {
      await UpdateDonations();
    } catch (error) {
      ERROR(`Error incrementing bounties: ${error}`);
    }
  }
}

async function PeriodicBountyUpdate() {
  const bounties = await prisma.bounty.findMany({
    where: {
      status: BountyState.Open,
      wallet: {
        walletControl: {
          fund: {
            not: 0,
          },
          incrementBy: {
            not: 0,
          },
          nextIncrementOn: {
            lte: new Date(),
          },
        },
      },
    },
    orderBy: {
      createdAt: 'asc',
    },
    include: {
      wallet: {
        include: {
          walletControl: true,
        },
      },
    },
  });

  LOG(`Fetched ${bounties.length} to increment bounty`);

  for (const b of bounties) {
    if (
      b.wallet.walletControl &&
      b.wallet.balance < b.wallet.walletControl.fund
    ) {
      const wControl = b.wallet.walletControl;
      let newBalance = b.wallet.balance + wControl.incrementBy;
      let nextDate = new Date(
        new Date().getTime() + wControl.incrementInDays * 24 * 60 * 60 * 1000
      );
      if (newBalance >= wControl.fund) {
        newBalance = wControl.fund;
        nextDate = b.closesAt;
      }
      await prisma.wallet.update({
        where: {
          address: b.wallet.address,
        },
        data: {
          balance: newBalance,
          updatedAt: new Date(),
          walletControl: {
            update: {
              numberOfIncrements: {
                increment: 1,
              },
              nextIncrementOn: nextDate,
              updatedAt: new Date(),
            },
          },
        },
      });
      LOG(
        `Incremeted ${b.wallet.address} from ${b.wallet.balance} to ${newBalance}`
      );
    }
  }
}

async function UpdateDonations() {
  const donations = await prisma.donation.findMany({
    where: {
      addedToBounty: false,
      isValid: true,
    },
    orderBy: {
      createdAt: 'asc',
    },
    include: {
      user: true,
      bounty: {
        include: {
          wallet: {
            include: {
              walletControl: true,
            },
          },
        },
      },
    },
  });

  for (const d of donations) {
    const provider = ethers.getDefaultProvider('matic');
    const txn = await provider.getTransaction(d.txnHash);
    const bountyWallet = d.bounty?.wallet.walletControl
      ? process.env.COMMON_WALLET
      : d.bounty?.wallet.address;
    if (txn) {
      if (txn.from === d.user?.address && txn.to === bountyWallet) {
        const donation = parseFloat(ethers.utils.formatEther(txn.value));
        if (d.bounty?.wallet.walletControl) {
          await prisma.wallet.update({
            where: {
              address: d.bounty.wallet.address,
            },
            data: {
              balance: d.bounty.wallet.balance + donation,
              walletControl: {
                update: {
                  fund: d.bounty.wallet.walletControl.fund + donation,
                },
              },
            },
          });
        } else {
          await prisma.wallet.update({
            where: {
              address: d.bounty?.wallet.address,
            },
            data: {
              balance: d.bounty?.wallet.balance ?? 0 + donation,
            },
          });
        }
        await prisma.donation.update({
          where: {
            id: d.id,
          },
          data: {
            addedToBounty: true,
            updatedAt: new Date(),
          },
        });
      } else {
        await prisma.donation.update({
          where: {
            id: d.id,
          },
          data: {
            isValid: false,
            updatedAt: new Date(),
          },
        });
        ERROR(`Data mismatch`);
      }
    } else {
      await prisma.donation.update({
        where: {
          id: d.id,
        },
        data: {
          isValid: false,
          updatedAt: new Date(),
        },
      });
      ERROR(`Cannot find transaction`);
    }
  }
}
