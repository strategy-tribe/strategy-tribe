import { PrismaClient } from '@prisma/client';
import { ThenArg } from '@trpc/server';

import { staffOnlyProcedure } from '@/server/procedures';

import { GetSolutionParams, GetSolutionSchema } from './getSolution';

/** To be called from the server. Fetches a solution by its slug */
export async function ServerGetPiiSolution(
  prisma: PrismaClient,
  params: GetSolutionParams
) {
  const { id } = params;
  const solution = await prisma.solution.findUnique({
    where: { id },
    select: {
      id: true,
      publish: true,
      pieSvg: true,
      dataSvg: true,
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

export type FullPiiSolution = NonNullable<
  ThenArg<ReturnType<typeof ServerGetPiiSolution>>
>;

export const getPiiSolution = staffOnlyProcedure
  .input(GetSolutionSchema)
  .query(async ({ input, ctx: { prisma } }) => {
    const solution = await ServerGetPiiSolution(prisma, input);
    return { solution };
  });
