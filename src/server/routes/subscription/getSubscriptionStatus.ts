import { PrismaClient } from '@prisma/client';
import { ThenArg } from '@trpc/server';
import { z } from 'zod';

import { signedInOnlyProcedure } from '@/server/procedures';

const GetSubscriptionSchema = z.object({
  userId: z.string(),
  orgId: z.string(),
});

export async function SubscriptionStatus(
  prisma: PrismaClient,
  params: GetSubscriptionParams
) {
  const isSubscribedToOrg = await prisma.watchOrganization.count({
    where: {
      userId: params.userId,
      orgId: params.orgId,
    },
  });
  const subscriptionStatus = isSubscribedToOrg > 0 ? true : false;
  return subscriptionStatus;
}

export type GetSubscriptionParams = z.infer<typeof GetSubscriptionSchema>;

export type Subscribe = NonNullable<
  ThenArg<ReturnType<typeof SubscriptionStatus>>
>;

export const getSubscriptionStatus = signedInOnlyProcedure
  .input(GetSubscriptionSchema)
  .query(async ({ input, ctx: { prisma } }) => {
    const subscriptionStatus = await SubscriptionStatus(prisma, input);
    return { subscriptionStatus };
  });
