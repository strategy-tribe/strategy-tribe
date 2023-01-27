import { BountyState } from '@prisma/client';

import { LOG } from '../importer/utils';
import prisma from '../prisma/prismaClient';

export async function IncrementBounty() {
  if (process.env.INCREMENT_BOUNTY === 'true') {
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
          new Date().getTime() + wControl.incrementInDays * 50 * 1000
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
}
