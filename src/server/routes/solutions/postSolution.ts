import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

import { staffOnlyProcedure } from '@/server/procedures';

import { getSvg } from '../utils/getSvg';

/** Schema used to post Solution */
const PostSolutionSchema = z.object({
  id: z.string().optional(),
  pieCode: z.string(),
  flowCode: z.string(),
  content: z.string(),
  publish: z.boolean(),
  target: z.string(),
});

export type PostSolutionParams = z.infer<typeof PostSolutionSchema>;

const CreateSolution = async (
  prisma: PrismaClient,
  input: PostSolutionParams
) => {
  const { id, pieCode, flowCode, content, publish, target } = input;

  const dataSvg = await getSvg(
    flowCode.replace('start ->', 'showData start ->')
  );
  const labelSvg = await getSvg(flowCode);
  const pieSvg = await getSvg(pieCode);
  const data = {
    pieCode,
    flowCode,
    pieSvg,
    labelSvg,
    dataSvg,
    content,
    publish,
    target: {
      connect: {
        name: target,
      },
    },
  };

  const solution = await prisma.solution.upsert({
    where: {
      id: id ?? '',
    },
    create: data,
    update: data,
  });
  return solution.id;
};

export const post = staffOnlyProcedure
  .input(PostSolutionSchema)
  .mutation(async ({ input, ctx }) => {
    const id = await CreateSolution(ctx.prisma, input);

    return {
      solution: id,
    };
  });
