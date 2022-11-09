import { PrismaClient, ReviewGrade, SubmissionState } from '@prisma/client';
import { ThenArg } from '@trpc/server';
import { z } from 'zod';

import { staffOnlyProcedure } from '@/server/procedures';

const PostReviewSchema = z.object({
  grade: z.nativeEnum(ReviewGrade),
  submissionId: z.string(),
  reviewerAddress: z.string(),
  reviewerComment: z.string(),
});

async function _postReview(prisma: PrismaClient, params: PostReviewParams) {
  const { grade, submissionId, reviewerAddress, reviewerComment } = params;
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

  return id;
}

/** Params necessary to call `postReview`  */
export type PostReviewParams = z.infer<typeof PostReviewSchema>;

/** Response to posting a review */
export type PostReviewResponse = NonNullable<
  ThenArg<ReturnType<typeof postReview>>
>;

export const postReview = staffOnlyProcedure
  .input(PostReviewSchema)
  .mutation(async ({ input, ctx: { prisma } }) => {
    const id = await _postReview(prisma, input);

    return {
      reviewId: id,
    };
  });
