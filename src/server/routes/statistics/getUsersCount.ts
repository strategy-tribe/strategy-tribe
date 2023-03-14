import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

import { publicProcedure } from '@/server/procedures';

import { ThenArg } from '../utils/helperTypes';

export async function _getUsersCountData(prisma: PrismaClient) {
  const users = await prisma.user.count();
  return users;
}

export type UsersCountData = NonNullable<
  ThenArg<ReturnType<typeof _getUsersCountData>>
>;

const GetUserCountSchema = z.object({}).optional();

export const getUsersCount = publicProcedure
  .input(GetUserCountSchema)
  .query(async ({ input, ctx: { prisma } }) => {
    const usersCountData = await _getUsersCountData(prisma);
    return { usersCountData, ...input };
  });
