import { z } from 'zod';

import prisma from '@/lib/prisma/prismaClient';

import { publicProcedure, router } from '../trpc';

export const bountyRouter = router({
  getBounty: publicProcedure
    .input(
      z.object({
        slug: z.string(),
      })
    )
    .query(async ({ input: { slug } }) => {
      const bounty = await prisma.bounty.findUnique({
        where: { slug },
        include: { tags: true, target: true, requirements: true },
      });
      return { bounty };
    }),
  getBounties: publicProcedure
    .input(
      z.object({
        amount: z.number(),
      })
    )
    .query(async ({ input }) => {
      const bounties = await prisma.bounty.findMany({
        take: input.amount,
        include: {
          tags: true,
          target: {
            include: {
              org: true,
            },
          },
        },
      });
      return { bounties };
    }),
});
