import {
  BountyState,
  Prisma,
  PrismaClient,
  SubmissionState,
} from '@prisma/client';
import { z } from 'zod';

import { Order } from '@/lib/models/Order';

import {
  SubmissionGraphStatus,
  SubmissionGraphWIP,
} from '@/components/pages/bountySubmissionGraph/BountySubGraphList';

import { staffOnlyProcedure } from '@/server/procedures';

import { ArrayElement, ThenArg } from '../utils/helperTypes';

/** Schema used to query for submissionGraphs */
const GetSubmissionGraphsSchema = z.object({
  order: z.nativeEnum(Order).default(Order.Desc).optional(),
  paginate: z.boolean().optional(),
  amount: z.number().optional(),
  page: z.number().optional(),
  status: z.nativeEnum(SubmissionGraphStatus),
  progress: z.nativeEnum(SubmissionGraphWIP).array().optional(),
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
    orderBy: {
      SubmissionGraph: {
        createdAt: input.order,
      },
    },
    select: SUBMISSION_GRAPH_SELECT,
  });

  return submissionGraphs;
};

const getWhere = (input: GetSubmissionGraphsParams) => {
  const { status, bountyTitle, progress } = input;
  if (
    status === SubmissionGraphStatus.NotStarted ||
    status === SubmissionGraphStatus.Completed
  ) {
    const where = Prisma.validator<Prisma.BountyWhereInput>()({
      title: {
        search: bountyTitle?.split(' ').join(' & '),
      },
      status: BountyState.Closed,
      invoices: {
        some: {
          submission: {
            state: SubmissionState.Accepted,
          },
        },
      },
      SubmissionGraph:
        status === SubmissionGraphStatus.NotStarted
          ? null
          : {
              isGraphComplete: true,
              isDataPointsVerified: true,
              isEnrichedDataVerified: true,
            },
    });
    return where;
  }

  const bountyWhere = {
    title: {
      search: bountyTitle?.split(' ').join(' & '),
    },
    status: BountyState.Closed,
    invoices: {
      some: {
        submission: {
          state: SubmissionState.Accepted,
        },
      },
    },
  };
  const where = Prisma.validator<Prisma.BountyWhereInput>()({
    AND: [
      {
        ...bountyWhere,
        SubmissionGraph: {
          isNot: null,
        },
      },
      {
        ...bountyWhere,
        SubmissionGraph: {
          isNot: {
            isGraphComplete: true,
            isDataPointsVerified: true,
            isEnrichedDataVerified: true,
          },
        },
      },
      {
        ...bountyWhere,
        SubmissionGraph: getSubGraphFilters(input),
      },
    ],
  });

  return where;
};

const getSubGraphFilters = (input: GetSubmissionGraphsParams) => {
  const { progress } = input;
  if (!progress) {
    return {
      isNot: {
        isGraphComplete: true,
        isDataPointsVerified: true,
        isEnrichedDataVerified: true,
      },
    };
  }

  const subGraphWhere: {
    isGraphComplete: boolean | undefined;
    isDataPointsVerified: boolean | undefined;
    isEnrichedDataVerified: boolean | undefined;
  } = {
    isGraphComplete: undefined,
    isDataPointsVerified: undefined,
    isEnrichedDataVerified: undefined,
  };

  if (progress.includes(SubmissionGraphWIP.GraphCompleted)) {
    if (!progress.includes(SubmissionGraphWIP.GraphNotCompleted)) {
      subGraphWhere.isGraphComplete = true;
    }
  } else if (progress.includes(SubmissionGraphWIP.GraphNotCompleted)) {
    subGraphWhere.isGraphComplete = false;
  }

  if (progress.includes(SubmissionGraphWIP.DatapointsCompleted)) {
    if (!progress.includes(SubmissionGraphWIP.DatapointsNotCompleted)) {
      subGraphWhere.isDataPointsVerified = true;
    }
  } else if (progress.includes(SubmissionGraphWIP.DatapointsNotCompleted)) {
    subGraphWhere.isDataPointsVerified = false;
  }

  if (progress.includes(SubmissionGraphWIP.EnrichmentCompleted)) {
    if (!progress.includes(SubmissionGraphWIP.EnrichmentNotCompleted)) {
      subGraphWhere.isEnrichedDataVerified = true;
    }
  } else if (progress.includes(SubmissionGraphWIP.EnrichmentNotCompleted)) {
    subGraphWhere.isEnrichedDataVerified = false;
  }

  return subGraphWhere;
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
