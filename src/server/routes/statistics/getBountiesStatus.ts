import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

import { publicProcedure } from '@/server/procedures';

import { ThenArg } from '../utils/helperTypes';

export async function _getBountiesStatusData(prisma: PrismaClient) {
  const bountiesStatus = await prisma.bounty.findMany({
    select: {
      slug: true,
      status: true,
    },
  });
  const total = bountiesStatus?.length ?? 0;
  let openBounties = 0;
  let closedBounties = 0;
  let waitingForFundsBounties = 0;

  bountiesStatus &&
    bountiesStatus.forEach((item: any) => {
      switch (item.status) {
        case 'Open':
          openBounties++;
          break;
        case 'Closed':
          closedBounties++;
          break;
        case 'WaitingForFunds':
          waitingForFundsBounties++;
          break;
        default:
          break;
      }
    });
  const processedBountiesStatusData = {
    total: total,
    openBounties: openBounties,
    closedBounties: closedBounties,
    waitingForFundsBounties: waitingForFundsBounties,
  };
  return processedBountiesStatusData;
}

export type BountiesStatusData = NonNullable<
  ThenArg<ReturnType<typeof _getBountiesStatusData>>
>;
const GetBountiesStatusDataSchema = z.object({}).optional();

export const getBountiesStatus = publicProcedure
  .input(GetBountiesStatusDataSchema)
  .query(async ({ input, ctx: { prisma } }) => {
    const bountiesStatusData = await _getBountiesStatusData(prisma);
    return { bountiesStatusData, ...input };
  });
