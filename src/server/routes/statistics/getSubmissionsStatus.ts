import { PrismaClient } from '@prisma/client';
import { TRPCError } from '@trpc/server';

import { ThenArg } from '../utils/helperTypes';

export async function GetSubmissionsStatusData(prisma: PrismaClient) {
  const submissionsStatus = await prisma.submission.findMany({
    select: {
      id: true,
      state: true,
      answers: {
        select: {
          requirement: {
            select: {
              type: true,
            },
          },
        },
      },
    },
  });
  return submissionsStatus;
}

export const getSubmissionsStatus = async (
  prisma: PrismaClient
): Promise<SubmissionsStatusData> => {
  const submissionsStatusData = await GetSubmissionsStatusData(prisma);
  if (!submissionsStatusData) {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Unable to query submissions states data',
    });
  }

  return submissionsStatusData;
};

export type SubmissionsStatusData = NonNullable<
  ThenArg<ReturnType<typeof GetSubmissionsStatusData>>
>;
