import { Prisma, PrismaClient, RequirementType } from '@prisma/client';
import { z } from 'zod';

import { staffOnlyProcedure } from '@/server/procedures';

import { getSvg, getSvgUrl } from '../utils/getSvg';

/** Schema used to post BountySubGraph */
const PostBountySubGraphSchema = z.object({
  slug: z.string(),
  code: z.string(),
  isComplete: z.boolean(),
  dataPoints: z
    .object({ type: z.nativeEnum(RequirementType), value: z.string() })
    .array(),
});

export type PostBountySubGraphParams = z.infer<typeof PostBountySubGraphSchema>;

const CreateBountySubGraph = async (
  prisma: PrismaClient,
  input: PostBountySubGraphParams
) => {
  const { slug, code, isComplete, dataPoints } = input;

  const labelSvg = await getSvg(code.replace('showData', ''));

  if (labelSvg === 'invalid encoded code') {
    throw new Error('Invalid Code. Please correct the graph code');
  }
  const dataSvg = await getSvg(code);

  const data = Prisma.validator<Prisma.SubmissionGraphUpdateInput>()({
    code,
    labelSvg,
    dataSvg,
    isComplete,
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

export const postBountySubGraph = staffOnlyProcedure
  .input(PostBountySubGraphSchema)
  .mutation(async ({ input, ctx }) => {
    const id = await CreateBountySubGraph(ctx.prisma, input);

    return {
      submissionGraph: id,
    };
  });
