import { PrismaClient } from '@prisma/client';
import { TRPCError } from '@trpc/server';

import { ThenArg } from '../utils/helperTypes';

export async function GetAvgSubmissionPayoutData(prisma: PrismaClient) {
  const payoutStatus = await prisma.invoice.findMany({
    where: {
      status: 'Paid',
    },
    select: {
      id: true,
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
  });
  return payoutStatus;
}

export const getAvgSubmissionPayout = async (
  prisma: PrismaClient
): Promise<AvgSubmissionPayoutData> => {
  const avgSubmissionPayoutData = await GetAvgSubmissionPayoutData(prisma);
  if (!avgSubmissionPayoutData) {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Unable to query payout data',
    });
  }

  return avgSubmissionPayoutData;
};

export type AvgSubmissionPayoutData = NonNullable<
  ThenArg<ReturnType<typeof GetAvgSubmissionPayoutData>>
>;
