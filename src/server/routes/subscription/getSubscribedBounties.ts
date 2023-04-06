import { PrismaClient } from '@prisma/client';
import { ThenArg } from '@trpc/server';
import { z } from 'zod';

import { signedInOnlyProcedure } from '@/server/procedures';

const GetSubscriptionSchema = z.object({
  userId: z.string(),
});

export async function SubscribedBounties(
  prisma: PrismaClient,
  params: GetSubscriptionParams
) {
  const allSubscribedBounties = await prisma.watchBounty.findMany({
    where: {
      userId: params.userId,
    },
    select: {
      id: true,
      bountySlug: true,
      bounty: {
        select: {
          title: true,
        },
      },
    },
    orderBy: {
      bounty: {
        title: 'asc',
      },
    },
  });
  return allSubscribedBounties;
}

export type GetSubscriptionParams = z.infer<typeof GetSubscriptionSchema>;

export type Subscribe = NonNullable<
  ThenArg<ReturnType<typeof SubscribedBounties>>
>;

export const getSubscribedBounties = signedInOnlyProcedure
  .input(GetSubscriptionSchema)
  .query(async ({ input, ctx: { prisma } }) => {
    const allSubscribedBounties = await SubscribedBounties(prisma, input);
    return { allSubscribedBounties };
  });
