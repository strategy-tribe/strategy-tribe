import { z } from 'zod';

import { publicProcedure, router } from '../procedures';

export const tagRouter = router({
  getTags: publicProcedure.query(async ({ ctx: { prisma } }) => {
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
    .query(async ({ input: { name }, ctx: { prisma } }) => {
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
