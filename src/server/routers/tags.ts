import { z } from 'zod';

import prisma from '@/lib/prisma/prismaClient';

import { publicProcedure, router } from '../trpc';

export const tagRouter = router({
  getTags: publicProcedure.query(async () => {
    const tags = await prisma.tag.findMany({
      include: {
        _count: true,
      },
    });
    return { tags };
  }),
  getTag: publicProcedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .query(async ({ input: { name } }) => {
      const tag = await prisma.tag.findUnique({
        where: {
          name,
        },
        include: {
          bounties: true,
          orgs: true,
          _count: true,
        },
      });
      return { tag };
    }),
});
