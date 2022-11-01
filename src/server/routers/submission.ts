import prisma from '@/lib/prisma/prismaClient';
import { z } from 'zod';
import { publicProcedure, router } from '../trpc';

export const submissionRouter = router({
  post: publicProcedure
  .input(
    z.object({
      slug: z.string(),
      address: z.string(),
      answers: z.any().array(),
    })
  )
  .mutation(async ({ input }) => {
    const { slug, address, answers } = input;
    const { id } = await prisma.submission.create({
      data: {
        state: 'WaitingForReview',
        answers: {
          createMany: {
            data: answers.map((a) => ({
              answer: a.input,
              requirementId: a.requirement.id
            })),
          },
        },
        author: {
          connect: {
            address: address,
          },
        },
        bounty: {
          connect: {
            slug,
          },
        },
      },
    });

    return {
      submissionId: id
    };
  }),
});
