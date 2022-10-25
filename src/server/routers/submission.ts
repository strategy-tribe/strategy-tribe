import { z } from 'zod';

import prisma from '@/lib/prisma/prismaClient';

import { publicProcedure, router } from '../trpc';

export const submissionRouter = router({
  post: publicProcedure
    .input(
      z.object({
        slug: z.string(),
        userId: z.string(),
        answers: z.string().array(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { slug, userId, answers } = input;
      const { id } = await prisma.submission.create({
        data: {
          state: 'WaitingForReview',
          answers,
          author: {
            connect: {
              id: userId,
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
        submissionId: id,
      };
    }),
});
