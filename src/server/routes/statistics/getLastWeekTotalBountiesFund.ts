import { PrismaClient } from '@prisma/client';
import { TRPCError } from '@trpc/server';

import { ThenArg } from '../utils/helperTypes';

export async function GetLastWeekTotalBountiesFundData(prisma: PrismaClient) {
  let lastDay: string | number = Date.now() - 7 * 24 * 60 * 60 * 1000;
  lastDay = new Date(lastDay).toISOString();
  const payoutStatus = await prisma.wallet.findMany({
    where: {
      updatedAt: {
        gte: lastDay,
      },
    },
    select: {
      id: true,
      updatedAt: true,
      balance: true,
    },
  });
  return payoutStatus;
}

export const getLastWeekTotalBountiesFund = async (
  prisma: PrismaClient
): Promise<LastWeekTotalBountyFundData> => {
  const lastWeekTotalBountyFund = await GetLastWeekTotalBountiesFundData(
    prisma
  );
  if (!lastWeekTotalBountyFund) {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Unable to query last week total bounty fund data',
    });
  }

  return lastWeekTotalBountyFund;
};

export type LastWeekTotalBountyFundData = NonNullable<
  ThenArg<ReturnType<typeof GetLastWeekTotalBountiesFundData>>
>;
