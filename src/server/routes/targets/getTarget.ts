import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

import { publicProcedure } from '@/server/procedures';

import { ThenArg } from '../utils/helperTypes';

const GetTargetSchema = z.object({
  name: z.string(),
});

const _getTarget = async (prisma: PrismaClient, params: GetTargetParams) => {
  const target = await prisma.target.findUnique({
    where: {
      name: params.name,
    },
    select: {
      _count: true,
      alsoKnownAs: true,
      bounties: true,
      name: true,
      org: true,
      type: true,
      bio: true,
    },
  });
  return target;
};

export type GetTargetParams = z.infer<typeof GetTargetSchema>;

export const getTarget = publicProcedure
  .input(GetTargetSchema)
  .query(async ({ input, ctx: { prisma } }) => {
    const target = await _getTarget(prisma, input);
    return { target };
  });

export type FullTarget = NonNullable<ThenArg<ReturnType<typeof _getTarget>>>;
