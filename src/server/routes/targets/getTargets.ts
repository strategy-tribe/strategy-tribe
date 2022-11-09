import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

import { publicProcedure } from '@/server/procedures';

import { ThenArg } from '../utils/helperTypes';

const GetTargetsSchema = z.object({
  amount: z.number().optional(),
});

const _getTargets = async (prisma: PrismaClient, params: GetTargetsParams) => {
  const { amount } = params;
  const targets = await prisma.target.findMany({
    take: amount,
    select: {
      _count: true,
      name: true,
      alsoKnownAs: true,
      description: true,
      type: true,
    },
  });
  return targets;
};

export type GetTargetsParams = z.infer<typeof GetTargetsSchema>;

export const getTargets = publicProcedure
  .input(GetTargetsSchema)
  .query(async ({ input, ctx: { prisma } }) => {
    const targets = await _getTargets(prisma, input);
    return targets;
  });

export type TargetsWithMetadata = NonNullable<
  ThenArg<ReturnType<typeof _getTargets>>
>;
