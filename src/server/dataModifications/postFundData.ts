import { getTotalBountyFund } from '@/lib/utils/statisticsHelpers';

import { LOG } from '../importer/utils';
import prisma from '../prisma/prismaClient';

export async function PostFundDataWeekly() {
  const totalFundData = await prisma.bounty.findMany({
    select: {
      wallet: {
        select: {
          balance: true,
        },
      },
    },
  });
  const totalBountyFunds = getTotalBountyFund(totalFundData, false);
  const paidData = await prisma.invoice.findMany({
    where: {
      status: 'Paid',
    },
    select: {
      bounty: {
        select: {
          wallet: {
            select: {
              balance: true,
            },
          },
        },
      },
    },
  });
  const paidBountiesFund = getTotalBountyFund(paidData, true);
  const fundData = await prisma.fundsData.create({
    data: {
      totalFunds: totalBountyFunds,
      paidFunds: paidBountiesFund,
    },
  });
  LOG(`Posted ${fundData} this week`);
}
