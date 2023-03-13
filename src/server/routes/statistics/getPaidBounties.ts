import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

import { calculateTotalBountyFund } from '@/lib/utils/statisticsHelpers';

import { publicProcedure } from '@/server/procedures';

import { ThenArg } from '../utils/helperTypes';

export async function _getLastWeekPaidBountiesData(prisma: PrismaClient) {
  const fundData = await prisma.invoice.findMany({
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
  const paidBountiesFund = calculateTotalBountyFund(fundData, true);
  return paidBountiesFund;
}

export type PaidBountiesData = NonNullable<
  ThenArg<ReturnType<typeof _getLastWeekPaidBountiesData>>
>;

const GetSubmissionsDataSchema = z.object({}).optional();

export const getPaidBounties = publicProcedure
  .input(GetSubmissionsDataSchema)
  .query(async ({ input, ctx: { prisma } }) => {
    const lastWeekPaidBountiesData = await _getLastWeekPaidBountiesData(prisma);
    return { lastWeekPaidBountiesData, ...input };
  });
