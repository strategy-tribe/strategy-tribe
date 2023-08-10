import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

import { ERROR } from '@/server/importer/utils';
import { signedInOnlyProcedure } from '@/server/procedures';

import { ThenArg } from '../utils/helperTypes';
const postSubscriptionSchema = z.object({
  userId: z.string(),
  orgId: z.string(),
  bountySlugs: z.string().array().optional(),
});

export type PostSubscriptionSchemaParams = z.infer<
  typeof postSubscriptionSchema
>;

async function _subscribeToOrg(
  prisma: PrismaClient,
  input: PostSubscriptionSchemaParams
) {
  try {
    const slugs = input.bountySlugs ?? [];
    const bountyEntriesOfOrg = slugs.map((slug: string) => ({
      user: {
        connect: {
          id: input.userId,
        },
      },
      bounty: {
        connect: {
          slug: slug,
        },
      },
    }));
    const subscription = await prisma.watchOrganization.create({
      data: {
        org: {
          connect: {
            id: input.orgId,
          },
        },
        user: {
          connect: {
            id: input.userId,
          },
        },
        watchBounty: {
          create: bountyEntriesOfOrg,
        },
      },
    });
    return subscription;
  } catch (error) {
    ERROR(`Error adding subscription: ${error}`);
  }
}

export const subscribeOrg = signedInOnlyProcedure
  .input(postSubscriptionSchema)
  .mutation(async ({ ctx, input }) => {
    const subscription = await _subscribeToOrg(ctx.prisma, input);
    return { subscription };
  });

/** Array of organizations with Metadata in them */
export type SubscriptionToOrg = NonNullable<
  ThenArg<ReturnType<typeof _subscribeToOrg>>
>;
