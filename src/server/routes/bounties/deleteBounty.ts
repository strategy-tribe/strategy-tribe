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
    const bounty = await prisma.bounty.delete({
      where: {
        slug: input.slug,
      },
    });
    LOG(`${bounty.slug}: Deleted bounty "${bounty.title}"`);
  });
