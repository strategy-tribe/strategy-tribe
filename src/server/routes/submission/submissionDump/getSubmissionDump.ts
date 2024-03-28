import {
  Prisma,
  PrismaClient,
  RequirementType,
  SubmissionState,
} from '@prisma/client';
import { z } from 'zod';

import { Order } from '@/lib/models/Order';
import { toTitleCase } from '@/lib/utils/StringHelpers';

import { sortDataPoints } from '@/server/dataFetch/utils';
import { dataDumpUserProcedure } from '@/server/procedures';

import { ArrayElement, ThenArg } from '../../utils/helperTypes';

export const GetSubmissionDumpSchema = z.object({
  countries: z.string().array().optional(),
  tags: z.string().array().optional(),
  types: z.nativeEnum(RequirementType).array().optional(),
  //input
  search: z.string().optional(),
  orgNames: z.string().array().optional(),
  targetNames: z.string().array().optional(),
  //non user
  includeEnriched: z.boolean().optional(),
  order: z.nativeEnum(Order).default(Order.Desc).optional(),
  amount: z.number().optional(),
  page: z.number().optional(),
});

export type GetSubmissionDumpParams = z.infer<typeof GetSubmissionDumpSchema>;

export const SUBMISSION_DUMP_SELECT =
  Prisma.validator<Prisma.SubmissionSelect>()({
    state: true,
    bounty: {
      select: {
        slug: true,
        title: true,
        tags: {
          select: {
            name: true,
          },
        },
        SubmissionGraph: {
          select: {
            renderUrl: true,
            enrichedData: true,
            isGraphComplete: true,
            isDataPointsVerified: true,
            isEnrichedDataVerified: true,
            dataPoints: {
              select: {
                type: true,
                value: true,
              },
            },
          },
        },
        target: {
          select: {
            name: true,
            org: {
              select: {
                name: true,
                countries: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    },
    answers: {
      select: {
        answer: true,
        requirement: {
          select: {
            title: true,
          },
        },
      },
    },
  });

export async function getDataDump(
  input: GetSubmissionDumpParams,
  prisma: PrismaClient,
  where: Prisma.SubmissionWhereInput
) {
  const submissions = await prisma.submission.findMany({
    where,
    select: SUBMISSION_DUMP_SELECT,
    skip: (input?.amount ?? 0) * (input?.page ?? 0),
    take: input.amount,
    orderBy: {
      createdAt: input.order,
    },
  });
  return submissions.map((sub, i) => {
    const data = sortDataPoints(sub.bounty?.SubmissionGraph?.dataPoints);

    return {
      'Serial No': `${i + 1}`,
      Bounty: sub.bounty?.title,
      Slug: sub.bounty?.slug,
      'Bounty URL': `${process.env.APP_DOMAIN}/bounty/${sub.bounty?.slug}`,
      Target: sub.bounty ? toTitleCase(sub.bounty.target.name) : '',
      Organisation: sub.bounty?.target.org
        ? toTitleCase(sub.bounty.target.org.name)
        : '',
      Countries: sub.bounty?.target.org?.countries.map((c) => c.name),
      Tags: sub.bounty?.tags.map((t) => t.name),
      Data: data,
      Research: sub.answers.find((ans) =>
        ans.requirement?.title.includes('How did you find this info')
      )?.answer,
      'Graph URL': sub.bounty?.SubmissionGraph?.isGraphComplete
        ? sub.bounty.SubmissionGraph.renderUrl
        : undefined,
      'Enriched Data':
        input.includeEnriched &&
        sub.bounty?.SubmissionGraph?.isEnrichedDataVerified
          ? JSON.parse(sub.bounty?.SubmissionGraph?.enrichedData)
          : undefined,
    };
  });
}

const getWhere = (
  input: GetSubmissionDumpParams
): Prisma.SubmissionWhereInput => {
  const where = Prisma.validator<Prisma.SubmissionWhereInput>()({
    state: SubmissionState.Accepted,
    bounty: {
      target: {
        AND: [
          {
            org: {
              AND: [
                {
                  name: {
                    in: input.orgNames,
                  },
                },
                {
                  countries: {
                    some: {
                      name: {
                        in: input.countries,
                      },
                    },
                  },
                },
              ],
            },
          },
          {
            name: {
              in: input.targetNames,
            },
          },
        ],
      },
      tags: {
        some: {
          name: {
            in: input.tags,
          },
        },
      },
      title: {
        search: input.search?.split(' ').join(' & '),
      },
      SubmissionGraph: {
        isDataPointsVerified: true,
        dataPoints: {
          some: {
            type: {
              in: input.types,
            },
          },
        },
      },
    },
  });
  return where;
};

async function countSubmissionDump(
  input: GetSubmissionDumpParams,
  prisma: PrismaClient
) {
  const where = getWhere(input);
  const count = await prisma.submission.count({ where });
  return count;
}

export const getSubmissionDump = dataDumpUserProcedure
  .input(GetSubmissionDumpSchema)
  .query(async ({ input, ctx }) => {
    const submissions: SubmissionDumpWithMetadata = await getDataDump(
      input,
      ctx.prisma,
      getWhere(input)
    );

    const count = await countSubmissionDump(input, ctx.prisma);

    return { submissions, count };
  });

type SubmissionDumpWithMetadata = ThenArg<ReturnType<typeof getDataDump>>;

export type SmallSubmissionDump = ArrayElement<SubmissionDumpWithMetadata>;
