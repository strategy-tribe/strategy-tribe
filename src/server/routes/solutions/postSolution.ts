import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

import { staffOnlyProcedure } from '@/server/procedures';

/** Schema used to post Solution */
const PostSolutionSchema = z.object({
  id: z.string(),
  mermaid: z.string(),
  content: z.string(),
  publish: z.boolean(),
  target: z.string(),
});

export type PostSolutionParams = z.infer<typeof PostSolutionSchema>;

const CreateSolution = async (
  prisma: PrismaClient,
  input: PostSolutionParams
) => {
  const { id, mermaid, content, publish, target } = input;

  const data = {
    mermaid,
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
      id,
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
