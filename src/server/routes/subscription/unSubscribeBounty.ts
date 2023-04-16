import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { LOG } from '@/server/importer/utils';
import { signedInOnlyProcedure } from '@/server/procedures';

const DeleteBountySubscriptionSchema = z.object({
  userId: z.string(),
  bountySlug: z.string(),
});

export type DeleteBountySubscriptionParams = z.infer<
  typeof DeleteBountySubscriptionSchema
>;

export const unSubscribeBounty = signedInOnlyProcedure
  .input(DeleteBountySubscriptionSchema)
  .mutation(async ({ input, ctx: { prisma } }) => {
    const subscription = await prisma.watchBounty.findFirst({
      where: {
        AND: {
          userId: input.userId,
          bountySlug: input.bountySlug,
        },
      },
    });
    if (!subscription) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'Subscription not found',
      });
    }
    const deleteSubscriptionId = subscription?.id;
    const deletedSubscription = await prisma.watchBounty.delete({
      where: {
        id: deleteSubscriptionId,
      },
    });
    LOG(
      `Deleted subscription for user "${input?.userId}"" "${deletedSubscription}"`
    );
  });
