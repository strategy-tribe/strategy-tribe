import { z } from 'zod';

import { LOG } from '@/server/importer/utils';
import { signedInOnlyProcedure } from '@/server/procedures';
import { TRPCError } from '@trpc/server';

const DeleteSubscriptionSchema = z.object({
  userId: z.string(),
  orgId: z.string(),
});

export type DeleteSubscriptionParams = z.infer<typeof DeleteSubscriptionSchema>;

export const unSubscribeOrg = signedInOnlyProcedure
  .input(DeleteSubscriptionSchema)
  .mutation(async ({ input, ctx: { prisma } }) => {
    const subscription = await prisma.watchOrganization.findFirst({
      where: {
        AND: {
          userId: input.userId,
          orgId: input.orgId,
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
    const deletedSubscription = await prisma.watchOrganization.delete({
      where: {
        id: deleteSubscriptionId,
      },
    });
    LOG(
      `Deleted subscription for user "${input?.userId}"" "${deletedSubscription}"`
    );
  });
