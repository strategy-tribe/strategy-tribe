import { PrismaClient } from '@prisma/client';
import { ThenArg } from '@trpc/server';
import { z } from 'zod';

import { signedInOnlyProcedure } from '@/server/procedures';

const GetSubscriptionSchema = z.object({
  userId: z.string(),
});

export async function SubscribedOrgs(
  prisma: PrismaClient,
  params: GetSubscriptionParams
) {
  const allSubscribedOrgs = await prisma.watchOrganization.findMany({
    where: {
      userId: params.userId,
    },
    select: {
      id: true,
      orgId: true,
      org: {
        select: {
          name: true,
          bio: true,
        },
      },
    },
    orderBy: {
      org: {
        name: 'asc',
      },
    },
  });
  return allSubscribedOrgs;
}

export type GetSubscriptionParams = z.infer<typeof GetSubscriptionSchema>;

export type Subscribe = NonNullable<ThenArg<ReturnType<typeof SubscribedOrgs>>>;

export const getSubscribedOrgs = signedInOnlyProcedure
  .input(GetSubscriptionSchema)
  .query(async ({ input, ctx: { prisma } }) => {
    const subscribedOrgs = await SubscribedOrgs(prisma, input);
    return { subscribedOrgs };
  });
