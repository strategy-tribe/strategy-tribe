import { Prisma, PrismaClient } from '@prisma/client';
import { ThenArg } from '@trpc/server';
import { z } from 'zod';

import { LOG } from '@/server/importer/utils';
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
  params: GetBountyParams
) {
  const { slug } = params;
  const bounty = await prisma.bounty.findUnique({
    where: { slug },
    select: BOUNTY_SELECTOR,
  });

  return bounty;
}

export type GetBountyParams = z.infer<typeof GetBountySchema>;

export type FullBounty = NonNullable<
  ThenArg<ReturnType<typeof ServerGetBounty>>
>;

export const getBounty = publicProcedure
  .input(GetBountySchema)
  .query(async ({ input, ctx }) => {
    LOG(ctx.req?.headers['x-forwarded-for']?.toString() as string);
    LOG(ctx.req?.headers['x-vercel-ip-country']?.toString() as string);
    LOG(ctx.req?.headers['x-vercel-ip-city']?.toString() as string);
    const bounty = await ServerGetBounty(ctx.prisma, input);
    return { bounty };
  });
