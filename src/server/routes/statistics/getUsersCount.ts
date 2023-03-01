import { PrismaClient } from '@prisma/client';
import { TRPCError } from '@trpc/server';

import { ThenArg } from '../utils/helperTypes';

export async function GetUsersCountData(prisma: PrismaClient) {
  const users = await prisma.user.count();
  return users;
}

export const getUsersCount = async (
  prisma: PrismaClient
): Promise<UsersCountData> => {
  const usersCountData = await GetUsersCountData(prisma);
  if (!usersCountData) {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Unable to query users count data',
    });
  }

  return usersCountData;
};

export type UsersCountData = NonNullable<
  ThenArg<ReturnType<typeof GetUsersCountData>>
>;
