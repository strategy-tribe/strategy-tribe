import { PrismaClient } from '@prisma/client';
import { ThenArg } from '@trpc/server';
import { z } from 'zod';

import { staffOnlyProcedure } from '@/server/procedures';

import { SMALL_BOUNTY_SELECTION } from '../bounties/getBounties';

const GetFpSchema = z.object({
  fp: z.string(),
});

/** To be called from the server. Fetches a fingerprint */
export async function ServerGetFp(prisma: PrismaClient, params: GetFpParams) {
  const { fp } = params;
  const fingerprint = await prisma.fingerprint.findUnique({
    where: {
      fingerprint: fp,
    },
    select: {
      fingerprint: true,
      ipDetails: {
        select: {
          ip: true,
          city: true,
          countyrCode: true,
        },
      },
      users: {
        select: {
          address: true,
          username: true,
        },
      },
      bounties: {
        select: SMALL_BOUNTY_SELECTION,
      },
    },
  });

  return fingerprint;
}

export type GetFpParams = z.infer<typeof GetFpSchema>;

export type FullFp = NonNullable<ThenArg<ReturnType<typeof ServerGetFp>>>;

export const getfingerprint = staffOnlyProcedure
  .input(GetFpSchema)
  .query(async ({ input, ctx: { prisma } }) => {
    const fp = await ServerGetFp(prisma, input);
    return { fp };
  });
