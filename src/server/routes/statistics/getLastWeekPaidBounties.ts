import { PrismaClient } from '@prisma/client';
import { TRPCError } from '@trpc/server';

import { ThenArg } from '../utils/helperTypes';

export async function GetLastWeekPaidBountiesData(prisma: PrismaClient) {
  let lastDay = Date.now() - 7 * 24 * 60 * 60 * 1000;
  lastDay = new Date(lastDay).toISOString();
  const payoutStatus = await prisma.invoice.findMany({
    where: {
      AND: [
        {
          status: 'Paid',
        },
        {
          paidDate: {
            gte: lastDay,
          },
        },
      ],
    },
    select: {
      id: true,
      paidDate: true,
      bounty: {
        select: {
          slug: true,
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

export const getLastWeekPaidBounties = async (
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
