import { PrismaClient } from '@prisma/client';
import { TRPCError } from '@trpc/server';

import { ThenArg } from '../utils/helperTypes';

export async function GetLastWeekTotalBountiesFundData(prisma: PrismaClient) {
  const payoutStatus = await prisma.bounty.findMany({
    select: {
      slug: true,
      wallet: {
        select: {
          balance: true,
        },
      },
      updatedAt: true,
    },
    orderBy: {
      updatedAt: 'desc',
    },
  });
  return payoutStatus;
}

export const getTotalBountiesFund = async (
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
