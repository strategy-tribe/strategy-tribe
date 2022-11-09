import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

import { publicProcedure } from '@/server/procedures';

const GetTagSchema = z.object({
  name: z.string(),
});

export type GetTagParams = z.infer<typeof GetTagSchema>;

async function _getTag(prisma: PrismaClient, params: GetTagParams) {
  const { name } = params;
  const tag = await prisma.tag.findUnique({
    where: {
      name,
    },
    include: {
      bounties: {
        select: {
          slug: true,
          title: true,
          tags: true,
          _count: {
            select: {
              submissions: true,
            },
          },
        },
      },
      orgs: {
        select: {
          name: true,
          bio: true,
          _count: true,
        },
      },
      _count: true,
    },
  });
  return tag;
}

export const getTag = publicProcedure
  .input(GetTagSchema)
  .query(async ({ input, ctx: { prisma } }) => {
    const tag = await _getTag(prisma, input);
    return { tag };
  });
