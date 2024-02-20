import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

import { staffOnlyProcedure } from '@/server/procedures';

import { getSvg, getSvgUrl } from '../utils/getSvg';

/** Schema used to post BountySubGraph */
const PostBountySubGraphSchema = z.object({
  slug: z.string(),
  code: z.string(),
  isComplete: z.boolean(),
});

export type PostBountySubGraphParams = z.infer<typeof PostBountySubGraphSchema>;

const CreateBountySubGraph = async (
  prisma: PrismaClient,
  input: PostBountySubGraphParams
) => {
  const { slug, code, isComplete } = input;

  const labelSvg = await getSvg(code.replace('showData', ''));

  if (labelSvg === 'invalid encoded code') {
    throw new Error('Invalid Code. Please correct the graph code');
  }
  const dataSvg = await getSvg(code);

  const data = {
    code,
    labelSvg,
    dataSvg,
    isComplete,
    renderUrl: getSvgUrl(code),
  };

  const bounty = await prisma.bounty.findFirst({
    where: {
      slug,
    },
    select: {
      SubmissionGraph: {
        select: {
          id: true,
        },
      },
    },
  });

  if (bounty?.SubmissionGraph?.id) {
    const submissionGraph = await prisma.submissionGraph.update({
      where: {
        id: bounty.SubmissionGraph.id,
      },
      data,
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
