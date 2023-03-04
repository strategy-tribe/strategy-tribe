import { PrismaClient } from '@prisma/client';
import { TRPCError } from '@trpc/server';

import { ThenArg } from '../utils/helperTypes';

export async function GetLastWeekPaidBountiesData(prisma: PrismaClient) {
  const payoutStatus = await prisma.invoice.findMany({
    where: {
      status: 'Paid',
    },
    select: {
      id: true,
      paidDate: true,
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
    orderBy: {
      paidDate: 'desc',
    },
  });
  return payoutStatus;
}

export const getPaidBounties = async (
  prisma: PrismaClient
): Promise<BountiesStatusData> => {
  const lastWeekPaidBountiesData = await GetLastWeekPaidBountiesData(prisma);
  if (!lastWeekPaidBountiesData) {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Unable to query last week paid bounties data',
    });
  }

  return lastWeekPaidBountiesData;
};

export type BountiesStatusData = NonNullable<
  ThenArg<ReturnType<typeof GetLastWeekPaidBountiesData>>
>;
