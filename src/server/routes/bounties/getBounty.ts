import { Prisma, PrismaClient } from '@prisma/client';
import { ThenArg } from '@trpc/server';
import { z } from 'zod';

import { publicProcedure } from '@/server/procedures';

import { SMALL_BOUNTY_SELECTION } from './getBounties';

const GetBountySchema = z.object({
  slug: z.string(),
});

const BOUNTY_SELECTOR = Prisma.validator<Prisma.BountySelect>()({
  ...SMALL_BOUNTY_SELECTION,
  wallet: {
    select: {
      address: true,
      balance: true,
      walletControl: {
        select: {
          initial: true,
          numberOfIncrements: true,
        },
      },
    },
  },
});

/** To be called from the server. Fetches a bounty by its slug */
export async function ServerGetBounty(
  prisma: PrismaClient,
  params: GetBountyParams,
  userLoggedIn = true
) {
  const { slug } = params;
  const bounty = await prisma.bounty.findUnique({
    where: { slug },
    select: userLoggedIn
      ? BOUNTY_SELECTOR
      : {
          ...BOUNTY_SELECTOR,
          tags: true,
          wallet: {
            select: {
              ...BOUNTY_SELECTOR.wallet.select,
              balance: false,
            },
          },
        },
  });

  return bounty;
}

export type GetBountyParams = z.infer<typeof GetBountySchema>;

export type FullBounty = NonNullable<
  ThenArg<ReturnType<typeof ServerGetBounty>>
>;

export const getBounty = publicProcedure
  .input(GetBountySchema)
  .query(async ({ input, ctx: { prisma, session } }) => {
    const bounty = await ServerGetBounty(
      prisma,
      input,
      !!(session && session.user)
    );
    return { bounty };
  });
