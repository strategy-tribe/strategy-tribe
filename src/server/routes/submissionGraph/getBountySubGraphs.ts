import { BountyState, Prisma, PrismaClient } from '@prisma/client';
import { z } from 'zod';

import { Order } from '@/lib/models/Order';

import { SubmissionGraphStatus } from '@/components/pages/bountySubmissionGraph/BountySubGraphList';

import { staffOnlyProcedure } from '@/server/procedures';

import { ArrayElement, ThenArg } from '../utils/helperTypes';

/** Schema used to query for submissionGraphs */
const GetSubmissionGraphsSchema = z.object({
  order: z.nativeEnum(Order).default(Order.Desc).optional(),
  paginate: z.boolean().optional(),
  amount: z.number().optional(),
  page: z.number().optional(),
  status: z.nativeEnum(SubmissionGraphStatus),
  bountyTitle: z.string().optional(),
});

export type GetSubmissionGraphsParams = z.infer<
  typeof GetSubmissionGraphsSchema
>;

/** Defines how to query the database to obtain `SmallSubmissionGraph`
 *
 * Exporting this so other queries can also fulfil having a `SmallBounty` in their "includes"
 *
 */
export const SUBMISSION_GRAPH_SELECT = Prisma.validator<Prisma.BountySelect>()({
  slug: true,
  title: true,
  createdAt: true,
  SubmissionGraph: {
    select: {
      dataSvg: true,
    },
  },
});

export const _getSubmissionGraphs = async (
  input: GetSubmissionGraphsParams,
  prisma: PrismaClient
) => {
  const where = getWhere(input);

  const submissionGraphs = await prisma.bounty.findMany({
    where: where,
    skip: (input?.amount ?? 0) * (input?.page ?? 0),
    take: input.amount,
    orderBy:
      input.status === SubmissionGraphStatus.NotStarted
        ? {
            createdAt: input.order,
          }
        : {
            SubmissionGraph: {
              createdAt: input.order,
            },
          },
    select: SUBMISSION_GRAPH_SELECT,
  });

  return submissionGraphs;
};

const getWhere = (input: GetSubmissionGraphsParams) => {
  const { status, bountyTitle } = input;
  if (status === SubmissionGraphStatus.NotStarted) {
    const where = Prisma.validator<Prisma.BountyWhereInput>()({
      AND: {
        title: {
          search: bountyTitle?.split(' ').join(' & '),
        },
        status: BountyState.Closed,
        SubmissionGraph: null,
      },
    });
    return where;
  }
  const where = Prisma.validator<Prisma.BountyWhereInput>()({
    AND: {
      title: {
        search: bountyTitle?.split(' ').join(' & '),
      },
      status: BountyState.Closed,
      SubmissionGraph: {
        isComplete: status === SubmissionGraphStatus.Completed ? true : false,
      },
    },
  });
  return where;
};

const countSubmissionGraphs = async (
  input: GetSubmissionGraphsParams,
  prisma: PrismaClient
) => {
  const where = getWhere(input);

  const count: number = await prisma.bounty.count({
    where: where,
  });

  return count;
};

export const getBountySubGraphs = staffOnlyProcedure
  .input(GetSubmissionGraphsSchema)
  .query(async ({ input, ctx }) => {
    const submissionGraphs: SubmissionGraphsWithMetadata =
      await _getSubmissionGraphs(input, ctx.prisma);

    const count = await countSubmissionGraphs(input, ctx.prisma);

    return { submissionGraphs, count };
  });

type SubmissionGraphsWithMetadata = ThenArg<
  ReturnType<typeof _getSubmissionGraphs>
>;

export type SmallSubmissionGraph = ArrayElement<SubmissionGraphsWithMetadata>;
