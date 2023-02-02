import { BountyState } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { LOG } from '@/server/importer/utils';
import { staffOnlyProcedure } from '@/server/procedures';

const DeleteBountySchema = z.object({
  slug: z.string(),
});

export type DeleteBountyParams = z.infer<typeof DeleteBountySchema>;

export const deleteBounty = staffOnlyProcedure
  .input(DeleteBountySchema)
  .mutation(async ({ input, ctx: { prisma } }) => {
    const bounty = await prisma.bounty.findUnique({
      where: {
        slug: input.slug,
      },
    });
    if (!bounty) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'Bounty not found',
      });
    }
    if (bounty?.status === BountyState.Closed) {
      throw new TRPCError({
        code: 'FORBIDDEN',
        message: 'Cannot delete closed bounty',
      });
    }
    const deletedBounty = await prisma.bounty.delete({
      where: {
        slug: input.slug,
      },
    });
    LOG(`${bounty?.slug}: Deleted bounty "${bounty?.title}"`);
  });
