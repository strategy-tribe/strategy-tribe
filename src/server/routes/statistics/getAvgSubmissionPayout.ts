import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

import { publicProcedure } from '@/server/procedures';

import { ThenArg } from '../utils/helperTypes';

export async function _getAvgSubmissionPayoutData(prisma: PrismaClient) {
  const submissionPayoutData = await prisma.invoice.findMany({
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
  let totalBountyPaidInMatics = 0;
  const totalPaidBounties = submissionPayoutData?.length || 0;
  submissionPayoutData &&
    submissionPayoutData.forEach((item: any) => {
      totalBountyPaidInMatics =
        totalBountyPaidInMatics + item?.bounty?.wallet?.balance ?? 0;
    });
  const avgSubmissionPayout = totalBountyPaidInMatics / totalPaidBounties;
  return avgSubmissionPayout;
}

export type AvgSubmissionPayoutData = NonNullable<
  ThenArg<ReturnType<typeof _getAvgSubmissionPayoutData>>
>;

const GetBountiesStatusDataSchema = z.object({}).optional();

export const getAvgSubmissionPayout = publicProcedure
  .input(GetBountiesStatusDataSchema)
  .query(async ({ input, ctx: { prisma } }) => {
    const avgSubmissionPayoutData = await _getAvgSubmissionPayoutData(prisma);
    return { avgSubmissionPayoutData, ...input };
  });
