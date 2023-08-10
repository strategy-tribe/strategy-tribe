import { Prisma, PrismaClient } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { User } from 'next-auth';
import { z } from 'zod';

import { Order } from '@/lib/models/Order';

import { signedInOnlyProcedure } from '@/server/procedures';

import { ArrayElement, ThenArg } from '../utils/helperTypes';

const getReferralsSchema = z.object({
  userIds: z.string().array().optional(),
  status: z.boolean().optional(),
  paginate: z.boolean().optional(),
  amount: z.number().optional(),
  page: z.number().optional(),
});

export type GetReferralsParams = z.infer<typeof getReferralsSchema>;

function isRequestForReferralsValid(
  input: GetReferralsParams,
  user: User
): boolean {
  const isAdminOrStaff = ['ADMIN', 'STAFF'].includes(user.rol);

  /** Checks if an array of ids contains more than just the id passed */
  function askingForSomeoneElses(ids: string[], user: string) {
    if (ids.length === 0) return false;
    const otherUsers = ids?.filter((otherUser) => otherUser !== user);
    return otherUsers.length > 0;
  }

  const isAskingForSomeoneElses = askingForSomeoneElses(
    input.userIds ?? [],
    user.externalId
  );

  if (!isAdminOrStaff && isAskingForSomeoneElses) return false;

  return true;
}

const getWhere = (input: GetReferralsParams, user: User) => {
  const owners: string[] | undefined =
    user.rol === 'REGULAR' ? [user.id] : input.userIds;

  const where = Prisma.validator<Prisma.ReferralWhereInput>()({
    AND: {
      referralPaid: input.status,
      referrer: owners
        ? {
            id: { in: owners },
          }
        : undefined,
    },
  });
  return where;
};

async function _getReferrals(
  input: GetReferralsParams,
  user: User,
  prisma: PrismaClient
) {
  if (!isRequestForReferralsValid(input, user)) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }

  const where = getWhere(input, user);

  const res = await prisma.referral.findMany({
    where,
    skip: (input?.amount ?? 0) * (input?.page ?? 0),
    take: input.amount,
    select: {
      id: true,
      referralPaid: true,
      txnHash: true,
      newUser: {
        select: {
          address: true,
        },
      },
    },
    orderBy: {
      createdAt: Order.Asc,
    },
  });

  return res;
}

const countReferrals = async (
  input: GetReferralsParams,
  user: User,
  prisma: PrismaClient
) => {
  if (!isRequestForReferralsValid(input, user)) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }

  const where = getWhere(input, user);

  const count: number = await prisma.referral.count({
    where: where,
  });

  return count;
};

export const getReferrals = signedInOnlyProcedure
  .input(getReferralsSchema)
  .query(async ({ ctx, input }) => {
    const referrals = await _getReferrals(input, ctx.session.user, ctx.prisma);
    const count = await countReferrals(input, ctx.session.user, ctx.prisma);
    return { referrals, count };
  });

/** Array of Referrals with Metadata in them */
export type FullReferrals = NonNullable<
  ThenArg<ReturnType<typeof _getReferrals>>
>;
export type Referral = ArrayElement<FullReferrals>;
