import { PrismaClient } from '@prisma/client';
import { ThenArg } from '@trpc/server';
import { z } from 'zod';

import { staffOnlyProcedure } from '@/server/procedures';

import { API_USERS_SELECT } from './getApiUsers';

export const GetApiUserSchema = z.object({
  id: z.string(),
});

/** To be called from the server. Fetches a apiUser by its slug */
export async function ServerGetApiUser(
  prisma: PrismaClient,
  params: GetApiUserParams
) {
  const { id } = params;
  const apiUser = await prisma.apiUser.findUnique({
    where: { id },
    select: API_USERS_SELECT,
  });
  return apiUser;
}

export type GetApiUserParams = z.infer<typeof GetApiUserSchema>;

export type FullApiUser = NonNullable<
  ThenArg<ReturnType<typeof ServerGetApiUser>>
>;

export const getApiUser = staffOnlyProcedure
  .input(GetApiUserSchema)
  .query(async ({ input, ctx: { prisma } }) => {
    const apiUser = await ServerGetApiUser(prisma, input);
    return { apiUser };
  });
