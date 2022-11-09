import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

import { publicProcedure } from '@/server/procedures';

const GetTagsSchema = z.object({});

export type GetTagsParams = z.infer<typeof GetTagsSchema>;

async function _getTags(prisma: PrismaClient) {
  const tags = await prisma.tag.findMany({
    select: {
      _count: true,
      name: true,
    },
  });
  return { tags };
}

export const getTags = publicProcedure
  .input(GetTagsSchema)
  .query(async ({ ctx: { prisma } }) => {
    const tags = await _getTags(prisma);
    return { tags };
  });
