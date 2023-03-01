import { PrismaClient } from '@prisma/client';
import { TRPCError } from '@trpc/server';

import { ThenArg } from '../utils/helperTypes';

export async function GetBountiesStatusData(prisma: PrismaClient) {
  const bountiesStatus = await prisma.bounty.findMany({
    select: {
      slug: true,
      status: true,
    },
  });
  return bountiesStatus;
}

export const getBountiesStatus = async (
  prisma: PrismaClient
): Promise<BountiesStatusData> => {
  const bountiesStatusData = await GetBountiesStatusData(prisma);
  if (!bountiesStatusData) {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Unable to query bounty status data',
    });
  }

  return bountiesStatusData;
};

export type BountiesStatusData = NonNullable<
  ThenArg<ReturnType<typeof GetBountiesStatusData>>
>;
