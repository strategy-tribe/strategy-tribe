import { Prisma, PrismaClient } from '@prisma/client';
import { ThenArg } from '@trpc/server';
import { z } from 'zod';

import { staffOnlyProcedure } from '@/server/procedures';

import { SMALL_BOUNTY_SELECTION } from '../bounties/getBounties';

const GetBountySubGraphSchema = z.object({
  slug: z.string(),
});

const BOUNTY_SELECTOR = Prisma.validator<Prisma.BountySelect>()({
  slug: true,
  title: true,
  SubmissionGraph: {
    select: {
      id: true,
      code: true,
      enrichedData: true,
      isGraphComplete: true,
      isDataPointsVerified: true,
      isEnrichedDataVerified: true,
      dataPoints: {
        select: {
          value: true,
          type: true,
        },
      },
    },
  },
  invoices: {
    select: {
      submission: {
        select: {
          state: true,
          uncertain: true,
          createdAt: true,
          updatedAt: true,
          id: true,
          bounty: {
            select: SMALL_BOUNTY_SELECTION,
          },
          answers: {
            select: {
              requirement: true,
              answer: true,
            },
          },
          review: true,
          author: {
            select: {
              address: true,
              id: true,
            },
          },
        },
      },
    },
  },
});

/** To be called from the server. Fetches a bounty by its slug */
export async function ServerGetBountySubGraph(
  prisma: PrismaClient,
  params: GetBountySubGraphParams
) {
  const { slug } = params;
  const bounty = await prisma.bounty.findUnique({
    where: { slug },
    select: BOUNTY_SELECTOR,
  });

  return bounty;
}

export type GetBountySubGraphParams = z.infer<typeof GetBountySubGraphSchema>;

export type FullBountySubGraph = NonNullable<
  ThenArg<ReturnType<typeof ServerGetBountySubGraph>>
>;

export const getBountySubGraph = staffOnlyProcedure
  .input(GetBountySubGraphSchema)
  .query(async ({ input, ctx: { prisma } }) => {
    const bounty = await ServerGetBountySubGraph(prisma, input);
    return { bounty };
  });
