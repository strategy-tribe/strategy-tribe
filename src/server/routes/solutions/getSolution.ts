import { Prisma, PrismaClient } from '@prisma/client';
import { ThenArg, TRPCError } from '@trpc/server';
import { readFileSync } from 'fs';
import path from 'path';
import { z } from 'zod';

import { publicProcedure } from '@/server/procedures';

import { SOLUTION_SELECTION } from './getSolutions';

export const GetSolutionSchema = z.object({
  id: z.string(),
});

export const FULL_SOLUTION_SELECTION =
  Prisma.validator<Prisma.SolutionSelect>()({
    ...SOLUTION_SELECTION,
    createdAt: false,
    pieSvg: true,
    labelSvg: true,
    content: true,
    target: {
      select: {
        name: true,
        bounties: {
          select: {
            slug: true,
            title: true,
            wallet: {
              select: {
                balance: true,
              },
            },
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
  });

/** To be called from the server. Fetches a solution by its slug */
export async function ServerGetSolution(
  prisma: PrismaClient,
  params: GetSolutionParams,
  isStaff = false,
  isLoggedIn = false
) {
  const { id } = params;
  const solution = await prisma.solution.findUnique({
    where: { id },
    select: FULL_SOLUTION_SELECTION,
  });

  if (!isStaff && !solution?.publish) {
    throw new TRPCError({
      code: 'BAD_REQUEST',
      message: 'Solution not found',
    });
  }
  if (!solution) {
    return solution;
  }
  const dataFolder = path.resolve(
    'public',
    'images',
    process.env.PRE_LOGIN_SOLUTION as string
  );
  const data = readFileSync(dataFolder);
  const _solution = {
    ...solution,
    content: !isLoggedIn
      ? `## Introduction
      
      Loading... `
      : solution.content,
    target: solution.target,
    labelSvg: isLoggedIn ? solution.labelSvg : data.toString(),
  };
  return _solution;
}

export type GetSolutionParams = z.infer<typeof GetSolutionSchema>;

export type FullSolution = NonNullable<
  ThenArg<ReturnType<typeof ServerGetSolution>>
>;

export const getSolution = publicProcedure
  .input(GetSolutionSchema)
  .query(async ({ input, ctx: { prisma, session } }) => {
    const solution = await ServerGetSolution(
      prisma,
      input,
      !!(session && session?.user && session?.user.rol !== 'REGULAR'),
      !!(session && session.user)
    );
    return { solution };
  });
