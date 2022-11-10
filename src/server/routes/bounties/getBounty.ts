import { Prisma, PrismaClient } from '@prisma/client';
import { ThenArg } from '@trpc/server';
import { z } from 'zod';

import { publicProcedure } from '@/server/procedures';

import { SMALL_BOUNTY_SELECTION } from './getBounties';

const GetBountySchema = z.object({
  slug: z.string(),
});

const bountySelector = Prisma.validator<Prisma.BountySelect>()({
  ...SMALL_BOUNTY_SELECTION,
  wallet: {
    select: {
      address: true,
      balance: true,
    },
  },
});

async function _getBounty(prisma: PrismaClient, params: GetBountyParams) {
  const { slug } = params;
  const bounty = await prisma.bounty.findUnique({
    where: { slug },
    select: bountySelector,
  });

  return bounty;
}

export type GetBountyParams = z.infer<typeof GetBountySchema>;

export type FullBounty = NonNullable<ThenArg<ReturnType<typeof _getBounty>>>;

export const getBounty = publicProcedure
  .input(GetBountySchema)
  .query(async ({ input, ctx: { prisma } }) => {
    const bounty = await _getBounty(prisma, input);
    return { bounty };
  });
