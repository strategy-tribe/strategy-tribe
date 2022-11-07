import { z } from 'zod';

import prisma from '@/lib/prisma/prismaClient';

import { publicProcedure, router } from '../trpc';

export const targetRouter = router({
  getTargets: publicProcedure
    .input(
      z.object({
        amount: z.number().optional(),
      })
    )
    .query(async ({ input: { amount } }) => {
      if (amount) {
        const targets = await prisma.target.findMany({
          take: amount,
          include: {
            org: true,
            bounties: true,
          },
        });
        return { targets };
      } else {
        const targets = await prisma.target.findMany({
          include: {
            org: true,
            bounties: true,
          },
        });
        return { targets };
      }
    }),
  getTarget: publicProcedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .query(async ({ input: { name } }) => {
      const target = await prisma.target.findUnique({
        where: {
          name,
        },
      });
      return { target };
    }),
});
