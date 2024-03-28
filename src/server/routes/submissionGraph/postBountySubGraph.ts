import { Prisma, PrismaClient, RequirementType } from '@prisma/client';
import { z } from 'zod';

import { getEnrichParams } from '@/server/dataFetch/utils';
import { ERROR, LOG } from '@/server/importer/utils';
import { staffOnlyProcedure } from '@/server/procedures';

import { getEnrichedData } from './enrichData';
import { getSvg, getSvgUrl } from '../utils/getSvg';

/** Schema used to post BountySubGraph */
const PostBountySubGraphSchema = z.object({
  slug: z.string(),
  code: z.string(),
  isGraphComplete: z.boolean(),
  isDataPointsVerified: z.boolean(),
  isEnrichedDataVerified: z.boolean(),
  enrichedData: z.string(),
  dataPoints: z
    .object({ type: z.nativeEnum(RequirementType), value: z.string() })
    .array(),
});

export type PostBountySubGraphParams = z.infer<typeof PostBountySubGraphSchema>;

const validateData = (input: PostBountySubGraphParams) => {
  if (input.isEnrichedDataVerified) {
    if (!input.isDataPointsVerified) {
      throw new Error(
        'Enriched data cannot be marked Completed without completing datapoints'
      );
    }
    try {
      const jsonData = JSON.parse(input?.enrichedData ?? '');
    } catch (e: any) {
      throw new Error(`Enriched Data not in JSON format. ${e.message}`);
    }
  }
};

const CreateBountySubGraph = async (
  prisma: PrismaClient,
  input: PostBountySubGraphParams
) => {
  validateData(input);
  const {
    slug,
    code,
    isGraphComplete,
    isDataPointsVerified,
    isEnrichedDataVerified,
    dataPoints,
    enrichedData,
  } = input;

  const labelSvg = await getSvg(code.replace('showData', ''));

  if (labelSvg === 'invalid encoded code') {
    throw new Error('Invalid Code. Please correct the graph code');
  }
  const dataSvg = await getSvg(code);

  const data = Prisma.validator<Prisma.SubmissionGraphUpdateInput>()({
    code,
    labelSvg,
    dataSvg,
    enrichedData,
    isGraphComplete,
    isDataPointsVerified,
    isEnrichedDataVerified,
    renderUrl: getSvgUrl(code),
  });

  const bounty = await prisma.bounty.findFirst({
    where: {
      slug,
    },
    select: {
      SubmissionGraph: {
        select: {
          id: true,
          dataPoints: {
            select: {
              type: true,
              value: true,
            },
          },
        },
      },
    },
  });

  if (bounty?.SubmissionGraph?.id) {
    const id = bounty.SubmissionGraph.id;
    const remove = bounty.SubmissionGraph.dataPoints.filter(
      (data) =>
        dataPoints.findIndex(
          (d) => d.type === data.type && d.value === data.value
        ) < 0
    );
    const submissionGraph = await prisma.submissionGraph.update({
      where: {
        id: id,
      },
      data: {
        ...data,
        dataPoints: {
          disconnect: remove.map((d) => ({
            dataPointIdentifier: {
              ...d,
              submissionGraphId: id,
            },
          })),
          connectOrCreate: dataPoints.map((d) => ({
            where: {
              dataPointIdentifier: {
                ...d,
                submissionGraphId: id,
              },
            },
            create: d,
          })),
        },
      },
    });

    return submissionGraph.id;
  }
  const submissionGraph = await prisma.submissionGraph.create({
    data: {
      ...data,
      bounty: {
        connect: {
          slug: slug,
        },
      },
      dataPoints: {
        create: dataPoints,
      },
    },
  });
  return submissionGraph.id;
};

const updateEnriched = async (
  id: string,
  prisma: PrismaClient,
  input: PostBountySubGraphParams
) => {
  if (
    input.isDataPointsVerified &&
    !input.isEnrichedDataVerified &&
    (!input.enrichedData ||
      input.enrichedData === '' ||
      input.enrichedData === '{}')
  ) {
    try {
      LOG('Enriching');
      const enrichedData = await getEnrichedData(
        getEnrichParams(input.dataPoints)
      );
      await prisma.submissionGraph.update({
        where: { id },
        data: {
          enrichedData: JSON.stringify(enrichedData, null, 4),
        },
      });
      LOG('Enriched');
    } catch (e: any) {
      ERROR(e.message);
    }
  }
};

export const postBountySubGraph = staffOnlyProcedure
  .input(PostBountySubGraphSchema)
  .mutation(async ({ input, ctx }) => {
    const id = await CreateBountySubGraph(ctx.prisma, input);
    updateEnriched(id, ctx.prisma, input);
    return {
      submissionGraph: id,
    };
  });
