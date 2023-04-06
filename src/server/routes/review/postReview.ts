import { InvoiceStatus, PrismaClient, ReviewGrade } from '@prisma/client';
import { ThenArg, TRPCError } from '@trpc/server';
import { User } from 'next-auth';
import { z } from 'zod';

import { staffOnlyProcedure } from '@/server/procedures';
import { CloseBounty } from '../bounties/updateBounty';
import { CreateInvoice } from '../invoice/postInvoice';
import { Notify_BountyClosed } from '../notification/utils/bounty';
import { _getSubmission } from '../submission/getSubmission';
import {
  AcceptAndNotifySubmission,
  RejectAndNotifySubmission,
} from '../submission/updateSubmission';
import { RejectAndNotifySubmissions } from '../submission/updateSubmissions';

const PostReviewSchema = z.object({
  grade: z.nativeEnum(ReviewGrade),
  submissionId: z.string(),
  reviewerAddress: z.string(),
  reviewerComment: z.string(),
});

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
    await _AcceptIt(prisma, user, submissionId);
  } else {
    await RejectAndNotifySubmission(prisma, submissionId);
  }

  return id;
}

/** All of the logic for accepting a submission */
async function _AcceptIt(
  prisma: PrismaClient,
  user: User,
  submissionId: string
) {
  const submission = await _getSubmission(prisma, user, { id: submissionId });

  if (!submission?.bounty) {
    throw new TRPCError({
      code: 'NOT_FOUND',
      message: 'Unable to find the bounty related to the submission',
    });
  }
  await CloseBounty(prisma, submission.bounty.slug);
  await Notify_BountyClosed(prisma, submission.bounty.slug);
  await RejectAndNotifySubmissions(prisma, {
    bountySlug: submission.bounty.slug,
    rejectAllButThisOne: submissionId,
  });

  await AcceptAndNotifySubmission(prisma, submissionId);

  await CreateInvoice(prisma, {
    status: InvoiceStatus.Unpaid,
    submissionId,
    slug: submission?.bounty?.slug as string,
  });
}
