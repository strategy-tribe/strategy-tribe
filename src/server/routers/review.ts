import { ReviewGrade, SubmissionState } from '@prisma/client';
import { z } from 'zod';

import { publicProcedure, router } from '../procedures';

export const reviewRouter = router({
  post: publicProcedure
    .input(
      z.object({
        grade: z.nativeEnum(ReviewGrade),
        submissionId: z.string(),
        reviewerAddress: z.string(),
        reviewerComment: z.string(),
      })
    )
    .mutation(async ({ input, ctx: { prisma } }) => {
      const { grade, submissionId, reviewerAddress, reviewerComment } = input;
      const { id } = await prisma.review.create({
        data: {
          grade: grade,
          content: reviewerComment,
          reviewer: {
            connect: {
              address: reviewerAddress,
            },
          },
          submission: {
            connect: {
              id: submissionId,
            },
          },
        },
      });

      const updateSub = await prisma.submission.update({
        where: {
          id: submissionId,
        },
        data: {
          state:
            grade === ReviewGrade.Accepted
              ? SubmissionState.WaitingForPayment
              : SubmissionState.Rejected,
        },
      });

      return {
        reviewId: id,
      };
    }),
});