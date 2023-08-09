import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

import { publicProcedure } from '@/server/procedures';

import { ArrayElement, ThenArg } from '../utils/helperTypes';

const GetTargetsSchema = z.object({
  amount: z.number().optional(),
});

export const _getTargets = async (
  prisma: PrismaClient,
  params?: GetTargetsParams
) => {
  const targets = await prisma.target.findMany({
    take: params?.amount,
    select: {
      _count: true,
      name: true,
      alsoKnownAs: true,
      bio: true,
      type: true,
      org: {
        select: {
          name: true,
        },
      },
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

export type SmallTarget = ArrayElement<TargetsWithMetadata>;
