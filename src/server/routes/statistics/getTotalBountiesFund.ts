import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

import { calculateTotalBountyFund } from '@/lib/utils/statisticsHelpers';

import { publicProcedure } from '@/server/procedures';

import { ThenArg } from '../utils/helperTypes';

export async function _getLastWeekTotalBountiesFundData(prisma: PrismaClient) {
  const fundData = await prisma.bounty.findMany({
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
  const totalBountyFunds = calculateTotalBountyFund(fundData, false);
  return totalBountyFunds;
}

export type TotalBountyFundData = NonNullable<
  ThenArg<ReturnType<typeof _getLastWeekTotalBountiesFundData>>
>;

const GetSubmissionsDataSchema = z.object({}).optional();

export const getTotalBountiesFund = publicProcedure
  .input(GetSubmissionsDataSchema)
  .query(async ({ input, ctx: { prisma } }) => {
    const lastWeekTotalBountyFund = await _getLastWeekTotalBountiesFundData(
      prisma
    );
    return { lastWeekTotalBountyFund, ...input };
  });
