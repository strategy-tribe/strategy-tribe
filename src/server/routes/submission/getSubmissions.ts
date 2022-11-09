import { Prisma, PrismaClient, SubmissionState } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { User } from 'next-auth';
import { z } from 'zod';

import { Order } from '@/lib/models/Order';

import { signedInOnlyProcedure } from '@/server/procedures';

import { ArrayElement, ThenArg } from '../utils/helperTypes';

/** Schema used to query for submissions */
const GetSubmissionsSchema = z.object({
  order: z.nativeEnum(Order).default(Order.Desc).optional(),
  paginate: z.boolean().optional(),
  amount: z.number().optional(),
  state: z.nativeEnum(SubmissionState).optional(),
  reviewed: z.boolean().optional(),
  owners: z.string().array().optional(),
  page: z.number().optional(),
  /** Slugs of the bounties */
  bounties: z.string().array().optional(),
});

export type GetSubmissionsParams = z.infer<typeof GetSubmissionsSchema>;

function isRequestForSubmissionsValid(
  input: GetSubmissionsParams,
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
    input.owners ?? [],
    user.profileId
  );

  if (!isAdminOrStaff && isAskingForSomeoneElses) return false;

  return true;
}

const _getSubmissions = async (
  input: GetSubmissionsParams,
  user: User,
  prisma: PrismaClient
) => {
  if (!isRequestForSubmissionsValid(input, user)) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }

  const owners: string[] | undefined =
    user.rol === 'REGULAR' ? [user.profileId] : input.owners;

  const where = Prisma.validator<Prisma.SubmissionWhereInput>()({
    AND: {
      state: input.state,
      authorId: owners
        ? {
            in: owners,
          }
        : undefined,
      bountySlug: input.bounties ? { in: input.bounties } : undefined,
      review: input.reviewed
        ? {
            isNot: {
              id: undefined,
            },
          }
        : undefined,
    },
  });
  const submissions = await prisma.submission.findMany({
    where: where,
    skip: (input?.amount ?? 0) * (input?.page ?? 0),
    take: input.amount ?? 10,
    orderBy: {
      createdAt: input.order,
    },
    include: {
      bounty: {
        include: {
          tags: true,
        },
      },
      answers: true,
    },
  });

  return submissions;
};

const countSubmissions = async (
  input: GetSubmissionsParams,
  user: User,
  prisma: PrismaClient
) => {
  if (!isRequestForSubmissionsValid(input, user)) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }

  const owners: string[] | undefined =
    user.rol === 'REGULAR' ? [user.profileId] : input.owners;

  const where = Prisma.validator<Prisma.SubmissionWhereInput>()({
    AND: {
      state: input.state,
      authorId: owners
        ? {
            in: owners,
          }
        : undefined,
      bountySlug: input.bounties ? { in: input.bounties } : undefined,
      review: input.reviewed
        ? {
            isNot: {
              id: undefined,
            },
          }
        : undefined,
    },
  });

  const count: number = await prisma.submission.count({
    where: where,
  });

  return count;
};

export const getSubmissions = signedInOnlyProcedure
  .input(GetSubmissionsSchema)
  .query(async ({ input, ctx }) => {
    const submissions: SubmissionsWithMetadata = await _getSubmissions(
      input,
      ctx.session.user,
      ctx.prisma
    );

    const count = await countSubmissions(input, ctx.session.user, ctx.prisma);

    return { submissions, count };
  });

type SubmissionsWithMetadata = ThenArg<ReturnType<typeof _getSubmissions>>;

export type SmallSubmission = ArrayElement<SubmissionsWithMetadata>;
