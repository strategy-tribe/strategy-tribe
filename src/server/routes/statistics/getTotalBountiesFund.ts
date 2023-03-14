import { PrismaClient } from '@prisma/client';
import { TRPCError } from '@trpc/server';

import { ThenArg } from '../utils/helperTypes';

export async function GetTotalBountiesFundData(prisma: PrismaClient) {
  let lastDay = Date.now() - 7 * 24 * 60 * 60 * 1000;
  lastDay = new Date(lastDay).toISOString();
  const payoutStatus = await prisma.wallet.aggregate({
    where: {
      updatedAt: {
        lt: lastDay,
      },
    },
    _sum: {
      balance: true,
    },
  });
  return payoutStatus;
}

export const getTotalBountiesFund = async (
  prisma: PrismaClient
): Promise<TotalBountiesFundData> => {
  const totalBountiesFundData = await GetTotalBountiesFundData(prisma);
  if (!totalBountiesFundData) {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Unable to query total bounty fund data',
    });
  }

  return totalBountiesFundData;
};

export type TotalBountiesFundData = NonNullable<
  ThenArg<ReturnType<typeof GetTotalBountiesFundData>>
>;
