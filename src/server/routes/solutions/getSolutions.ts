import { Prisma, PrismaClient } from '@prisma/client';
import { z } from 'zod';

import { Order } from '@/lib/models/Order';

import { publicProcedure } from '@/server/procedures';

import { ArrayElement, ThenArg } from '../utils/helperTypes';

const getSolutionsSchema = z.object({
  paginate: z.boolean().optional(),
  amount: z.number().optional(),
  page: z.number().optional(),
  publish: z.boolean().optional(),
});

export type GetSolutionsSchemaParams = z.infer<typeof getSolutionsSchema>;

export const SOLUTION_SELECTION = Prisma.validator<Prisma.SolutionSelect>()({
  id: true,
  publish: true,
  createdAt: true,
  target: {
    select: {
      name: true,
      bio: true,
      org: {
        select: {
          name: true,
        },
      },
      _count: {
        select: {
          bounties: true,
        },
      },
    },
  },
});

async function _getSolutions(
  input: GetSolutionsSchemaParams,
  prisma: PrismaClient,
  isStaff = false
) {
  const res = await prisma.solution.findMany({
    where: isStaff ? {} : { publish: true },
    skip: (input?.amount ?? 0) * (input?.page ?? 0),
    take: input.amount,
    select: SOLUTION_SELECTION,
    orderBy: {
      createdAt: Order.Desc,
    },
  });

  return res;
}

const countSolutions = async (
  input: GetSolutionsSchemaParams,
  prisma: PrismaClient,
  isStaff: boolean
) => {
  const count: number = await prisma.solution.count({
    where: isStaff ? {} : { publish: true },
  });

  return count;
};

export const getSolutions = publicProcedure
  .input(getSolutionsSchema)
  .query(async ({ ctx: { prisma, session }, input }) => {
    const solutions = await _getSolutions(
      input,
      prisma,
      !!(
        session &&
        session?.user &&
        ['ADMIN', 'STAFF'].includes(session.user.rol)
      )
    );
    const count = await countSolutions(
      input,
      prisma,
      !!(
        session &&
        session?.user &&
        ['ADMIN', 'STAFF'].includes(session.user.rol)
      )
    );
    return { solutions, count };
  });

/** Array of Solutions with Metadata in them */
export type SmallSolutions = NonNullable<
  ThenArg<ReturnType<typeof _getSolutions>>
>;

export type SmallSolution = ArrayElement<SmallSolutions>;
