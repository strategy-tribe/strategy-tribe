import { PrismaClient } from '@prisma/client';
import { ThenArg, TRPCError } from '@trpc/server';
import { z } from 'zod';

import { signedInOnlyProcedure } from '@/server/procedures';

import { SOLUTION_SELECTION } from './getSolutions';

const GetSolutionSchema = z.object({
  id: z.string(),
});

/** To be called from the server. Fetches a solution by its slug */
export async function ServerGetSolution(
  prisma: PrismaClient,
  params: GetSolutionParams,
  isStaff = false
) {
  const { id } = params;
  const solution = await prisma.solution.findUnique({
    where: { id },
    select: {
      ...SOLUTION_SELECTION,
      createdAt: false,
      mermaid: true,
      content: true,
      target: {
        select: {
          name: true,
          bounties: {
            select: {
              tags: {
                select: {
                  name: true,
                },
              },
            },
          },
          org: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  if (!isStaff && !solution?.publish) {
    throw new TRPCError({
      code: 'BAD_REQUEST',
      message: 'Solution not found',
    });
  }
  return solution;
}

export type GetSolutionParams = z.infer<typeof GetSolutionSchema>;

export type FullSolution = NonNullable<
  ThenArg<ReturnType<typeof ServerGetSolution>>
>;

export const getSolution = signedInOnlyProcedure
  .input(GetSolutionSchema)
  .query(async ({ input, ctx: { prisma, session } }) => {
    const solution = await ServerGetSolution(
      prisma,
      input,
      !!(session && session?.user && session?.user.rol !== 'REGULAR')
    );
    return { solution };
  });
