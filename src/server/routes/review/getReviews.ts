import { Prisma, PrismaClient, ReviewGrade } from '@prisma/client';
import { User } from 'next-auth';
import { z } from 'zod';

import { Order } from '@/lib/models/Order';

import { staffOnlyProcedure } from '@/server/procedures';

import { ArrayElement, ThenArg } from '../utils/helperTypes';

/** Schema used to query for Reviews */
const GetReviewsSchema = z.object({
  order: z.nativeEnum(Order).default(Order.Desc).optional(),
  paginate: z.boolean().optional(),
  amount: z.number().optional(),
  grade: z.nativeEnum(ReviewGrade).optional(),
  reviewerIds: z.string().optional(),
  submissionIds: z.string().array().optional(),
  page: z.number().optional(),
});

export type GetReviewsParams = z.infer<typeof GetReviewsSchema>;

export const _getReviews = async (
  input: GetReviewsParams,
  user: User,
  prisma: PrismaClient
) => {
  const where = Prisma.validator<Prisma.ReviewWhereInput>()({
    AND: {
      grade: input.grade,
      reviewerId: {
        in: [user.id],
      },
      submissionId: input.submissionIds
        ? { in: input.submissionIds }
        : undefined,
    },
  });

  const reviews = await prisma.review.findMany({
    where: where,
    skip: (input?.amount ?? 0) * (input?.page ?? 0),
    take: input.amount,
    orderBy: {
      createdAt: input.order,
    },
    select: {
      id: true,
      grade: true,
      content: true,
      submission: {
        select: {
          id: true,
          authorId: true,
          answers: true,
          bounty: {
            select: {
              slug: true,
              title: true,
              wallet: true,
            },
          },
        },
      },
    },
  });

  return reviews;
};

const countReviews = async (
  input: GetReviewsParams,
  user: User,
  prisma: PrismaClient
) => {
  const where = Prisma.validator<Prisma.ReviewWhereInput>()({
    AND: {
      grade: input.grade,
      reviewerId: {
        in: [user.id],
      },
      submissionId: input.submissionIds
        ? { in: input.submissionIds }
        : undefined,
    },
  });

  const count: number = await prisma.review.count({
    where: where,
  });

  return count;
};

export const getReviews = staffOnlyProcedure
  .input(GetReviewsSchema)
  .query(async ({ input, ctx }) => {
    const reviews: ReviewsWithMetadata = await _getReviews(
      input,
      ctx.session.user,
      ctx.prisma
    );

    const count = await countReviews(input, ctx.session.user, ctx.prisma);

    return { reviews, count };
  });

type ReviewsWithMetadata = ThenArg<ReturnType<typeof _getReviews>>;

export type SmallReview = ArrayElement<ReviewsWithMetadata>;
