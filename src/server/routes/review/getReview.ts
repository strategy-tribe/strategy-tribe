import {
  BountyState,
  InvoiceStatus,
  PrismaClient,
  ReviewGrade,
  SubmissionState,
} from '@prisma/client';
import { ThenArg } from '@trpc/server';
import { User } from 'next-auth';
import { z } from 'zod';

import { staffOnlyProcedure } from '@/server/procedures';

import { _updateBounty } from '../bounties/updateBounty';
import { _postInvoice } from '../invoice/postInvoice';
import { _getSubmission } from '../submission/getSubmission';
import { _updateSubmission } from '../submission/updateSubmission';
import { _updateSubmissions } from '../submission/updateSubmissions';

const PostReviewSchema = z.object({
  grade: z.nativeEnum(ReviewGrade),
  submissionId: z.string(),
  reviewerAddress: z.string(),
  reviewerComment: z.string(),
});

async function _postReview(
  prisma: PrismaClient,
  user: User,
  params: PostReviewParams
) {
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

  if (grade === ReviewGrade.Accepted) {
    const submission = await _getSubmission(prisma, user, { id: submissionId });
    await _updateSubmissions(
      {
        state: SubmissionState.WaitingForReview,
        exceptIds: [submissionId],
        bounties: [submission?.bounty?.slug as string],
      },
      {
        state: SubmissionState.Rejected,
      },
      prisma
    );
    await _updateBounty(
      {
        slug: submission?.bounty?.slug as string,
      },
      {
        status: BountyState.PaymentNeeded,
      },
      prisma
    );
    await _postInvoice(
      {
        status: InvoiceStatus.Unpaid,
        submissionId,
        slug: submission?.bounty?.slug as string,
      },
      prisma
    );
  }

  await _updateSubmission(
    {
      id: submissionId,
    },
    {
      state:
        grade === ReviewGrade.Accepted
          ? SubmissionState.WaitingForPayment
          : SubmissionState.Rejected,
    },
    prisma
  );

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
  .mutation(async ({ input, ctx }) => {
    const id = await _postReview(ctx.prisma, ctx.session.user, input);

    return {
      reviewId: id,
    };
  });
