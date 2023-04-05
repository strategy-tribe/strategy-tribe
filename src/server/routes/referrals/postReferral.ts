import { PrismaClient } from '@prisma/client';
import { ThenArg, TRPCError } from '@trpc/server';
import { z } from 'zod';

import { signedInOnlyProcedure } from '@/server/procedures';

const PostReferralSchema = z.object({
  referralCode: z.string(),
  user: z.string(),
});

/** Params necessary to call `postReferral`  */
export type PostReferralParams = z.infer<typeof PostReferralSchema>;

/** Response to creating referral */
export type PostReferralResponse = NonNullable<
  ThenArg<ReturnType<typeof postReferral>>
>;

const checkReferralValidity = async (
  input: PostReferralParams,
  prisma: PrismaClient
) => {
  const referrer = await prisma.user.findUnique({
    where: {
      referralCode: input.referralCode,
    },
  });
  if (!referrer) {
    throw new TRPCError({
      code: 'BAD_REQUEST',
      message: 'Invalid referral code',
    });
  }
  const newUser = await prisma.user.findUnique({
    where: {
      address: input.user,
    },
    include: {
      joinedReferal: true,
    },
  });
  if (!newUser) {
    throw new TRPCError({
      code: 'NOT_FOUND',
      message: 'Cannot find new user',
    });
  }
  if (
    newUser.joinedReferal ||
    newUser.createdAt < new Date(new Date().getTime() - 2 * 60 * 1000)
  ) {
    throw new TRPCError({
      code: 'BAD_REQUEST',
      message: 'Existing user.',
    });
  }
};

export const postReferral = signedInOnlyProcedure
  .input(PostReferralSchema)
  .mutation(async ({ input, ctx: { prisma, session } }) => {
    const isReferralValid = await checkReferralValidity(input, prisma);

    const referral = await prisma.referral.create({
      data: {
        referralPaid: false,
        referrer: {
          connect: {
            referralCode: input.referralCode,
          },
        },
        newUser: {
          connect: {
            address: input.user,
          },
        },
      },
    });

    return {
      referral,
    };
  });
