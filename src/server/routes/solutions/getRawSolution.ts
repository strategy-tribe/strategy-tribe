import { PrismaClient } from '@prisma/client';
import { ThenArg } from '@trpc/server';

import { staffOnlyProcedure } from '@/server/procedures';

import { GetSolutionParams, GetSolutionSchema } from './getSolution';

/** To be called from the server. Fetches a solution by its slug */
export async function ServerGetRawSolution(
  prisma: PrismaClient,
  params: GetSolutionParams
) {
  const { id } = params;
  const solution = await prisma.solution.findUnique({
    where: { id },
    select: {
      id: true,
      publish: true,
      pieCode: true,
      flowCode: true,
      content: true,
      target: {
        select: {
          name: true,
        },
      },
    },
  });
  return solution;
}

export type FullRawSolution = NonNullable<
  ThenArg<ReturnType<typeof ServerGetRawSolution>>
>;

export const getRawSolution = staffOnlyProcedure
  .input(GetSolutionSchema)
  .query(async ({ input, ctx: { prisma } }) => {
    const solution = await ServerGetRawSolution(prisma, input);
    return { solution };
  });
