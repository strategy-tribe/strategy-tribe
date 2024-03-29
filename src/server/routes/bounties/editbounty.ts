import { BountyState, PrismaClient } from '@prisma/client';
import { ThenArg } from '@trpc/server';
import { z } from 'zod';

import { staffOnlyProcedure } from '@/server/procedures';

import { GetFullBounty } from './getFullBounty';

const EditBountySchema = z.object({
  slug: z.string(),
  title: z.string(),
  description: z.string(),
  closesAt: z.date(),
  status: z.nativeEnum(BountyState),
  tags: z.object({
    old: z
      .object({
        name: z.string(),
      })
      .array(),
    new: z
      .object({
        name: z.string(),
      })
      .array(),
  }),
  target: z.object({
    id: z.string(),
    name: z.string(),
    alsoKnownAs: z.string().array(),
    bio: z.string().nullable(),
    org: z
      .object({
        id: z.string(),
        name: z.string(),
        alsoKnownAs: z.string().array(),
        bio: z.string().nullable(),
        links: z.string().array(),
        why: z.string().nullable(),
        tags: z.object({
          old: z
            .object({
              name: z.string(),
            })
            .array(),
          new: z
            .object({
              name: z.string(),
            })
            .array(),
        }),
        countries: z.object({
          old: z
            .object({
              name: z.string(),
            })
            .array(),
          new: z
            .object({
              name: z.string(),
            })
            .array(),
        }),
      })
      .nullable(),
  }),
  wallet: z.object({
    id: z.string(),
    balance: z.number(),
    address: z.string(),
    walletControl: z
      .object({
        initial: z.number(),
        incrementBy: z.number(),
        incrementInDays: z.number(),
        nextIncrementOn: z.date(),
      })
      .nullable(),
  }),
});

/** Params necessary to call `EditBounty`  */
export type EditBountyParams = z.infer<typeof EditBountySchema>;

/** Response to editing Bounties */
export type EditBountyResponse = NonNullable<
  ThenArg<ReturnType<typeof editBounty>>
>;

const updateBounty = async (input: EditBountyParams, prisma: PrismaClient) => {
  await prisma.bounty.update({
    data: {
      title: input.title,
      description: input.description,
      closesAt: input.closesAt,
      updatedAt: new Date(),
      tags: {
        disconnect: input.tags.old.map((tag) => ({
          name: tag.name,
        })),
        connectOrCreate: input.tags?.new
          .filter((tag) => tag.name !== '')
          .map((tag) => ({
            create: {
              name: tag.name,
            },
            where: {
              name: tag.name,
            },
          })),
      },
      target: {
        update: {
          name: input.target.name,
          alsoKnownAs: input.target.alsoKnownAs.filter((aka) => aka !== ''),
          bio: input.target.bio,
          org: {
            update: {
              name: input.target.org?.name,
              alsoKnownAs: input.target.org?.alsoKnownAs.filter(
                (aka) => aka !== ''
              ),
              bio: input.target.org?.bio,
              why: input.target.org?.why,
              links: input.target.org?.links.filter((link) => link !== ''),
              tags: {
                disconnect: input.target.org?.tags?.old.map((tag) => ({
                  name: tag.name,
                })),
                connectOrCreate: input.target.org?.tags?.new
                  .filter((tag) => tag.name !== '')
                  .map((tag) => ({
                    create: {
                      name: tag.name,
                    },
                    where: {
                      name: tag.name,
                    },
                  })),
              },
              countries: {
                disconnect: input.target.org?.countries?.old.map((c) => ({
                  name: c.name,
                })),
                connect: input.target.org?.countries?.new
                  .filter((c) => c.name !== '')
                  .map((c) => ({
                    name: c.name,
                  })),
              },
            },
          },
        },
      },
    },
    where: {
      slug: input.slug,
    },
  });
  if (input.wallet.walletControl) {
    await prisma.wallet.update({
      where: {
        address: input.wallet.address,
      },
      data: {
        balance: input.wallet.balance,
        updatedAt: new Date(),
        walletControl: {
          update: {
            initial: input.wallet.walletControl.initial,
            incrementBy: input.wallet.walletControl.incrementBy,
            incrementInDays: input.wallet.walletControl.incrementInDays,
            nextIncrementOn: input.wallet.walletControl.nextIncrementOn,
            updatedAt: new Date(),
          },
        },
      },
    });
  }
};

export const editBounty = staffOnlyProcedure
  .input(EditBountySchema)
  .mutation(async ({ input, ctx }) => {
    await updateBounty(input, ctx.prisma);
    const bounty = (
      await GetFullBounty(ctx.prisma, { slugs: [input.slug] })
    )[0];
    return bounty;
  });
