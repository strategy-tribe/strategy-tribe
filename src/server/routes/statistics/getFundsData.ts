import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

import { publicProcedure } from '@/server/procedures';

import { ThenArg } from '../utils/helperTypes';

export async function _getFundData(prisma: PrismaClient) {
  const fundData = await prisma.fundsData.findMany({
    select: {
      totalFunds: true,
      paidFunds: true,
      date: true,
    },
    orderBy: {
      date: 'desc',
    },
  });
  // console.log(fundData, 'fetch fata');
  // if(fundData.length > 7) {
  //   fundData = fundData.slice()
  // }
  const bountyAmountPaid: number[] = [];
  const totalBountyFunding: number[] = [];
  const labels: string[] = [];
  fundData &&
    fundData.forEach((data) => {
      bountyAmountPaid.push(data.paidFunds);
      totalBountyFunding.push(data.totalFunds);
      const date = new Date(data.date).toLocaleDateString('en-GB');
      labels.push(date);
    });
  return {
    totalBountyFunding,
    bountyAmountPaid,
    labels,
  };
}

export type FundData = NonNullable<ThenArg<ReturnType<typeof _getFundData>>>;

const GetFundDataSchema = z.object({}).optional();

export const getFundsData = publicProcedure
  .input(GetFundDataSchema)
  .query(async ({ input, ctx: { prisma } }) => {
    const funds = await _getFundData(prisma);
    return { funds, ...input };
  });
