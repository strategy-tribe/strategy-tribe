import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

import { ERROR } from '@/server/importer/utils';
import { signedInOnlyProcedure } from '@/server/procedures';

import { ThenArg } from '../utils/helperTypes';
const postSubscriptionSchema = z.object({
  userId: z.string(),
  bountySlug: z.string(),
});

export type PostSubscriptionBountySchemaParams = z.infer<
  typeof postSubscriptionSchema
>;

async function _subscribeToBounty(
  prisma: PrismaClient,
  input: PostSubscriptionBountySchemaParams
) {
  try {
    const subscription = await prisma.watchBounty.create({
      data: {
        bounty: {
          connect: {
            slug: input.bountySlug,
          },
        },
        user: {
          connect: {
            id: input.userId,
          },
        },
      },
    });
    return subscription;
  } catch (error) {
    ERROR(`Error adding subscription: ${error}`);
  }
}

export const subscribeBounty = signedInOnlyProcedure
  .input(postSubscriptionSchema)
  .mutation(async ({ ctx, input }) => {
    const subscription = await _subscribeToBounty(ctx.prisma, input);
    return { subscription };
  });

/** Array of organizations with Metadata in them */
export type SubscriptionToOrg = NonNullable<
  ThenArg<ReturnType<typeof _subscribeToBounty>>
>;
