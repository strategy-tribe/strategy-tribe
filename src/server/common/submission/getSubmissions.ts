import { PrismaClient, Submission } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { User } from 'next-auth';

import { iGetSubmissionsSchema } from './schemas';

function isRequestForSubmissionsValid(
  input: iGetSubmissionsSchema,
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

export const getSubmissions = async (
  input: iGetSubmissionsSchema,
  user: User,
  prisma: PrismaClient
): Promise<
  { submissions: Submission[] | undefined; count: number } | undefined
> => {
  if (!isRequestForSubmissionsValid(input, user)) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }

  const owners: string[] | undefined =
    user.rol === 'REGULAR' ? [user.profileId] : input.owners;

  try {
    const filters = {
      AND: {
        state: input.state,
        authorId: owners
          ? {
              in: owners,
            }
          : undefined,
        bountyId: input.bounties ? { in: input.bounties } : undefined,
        review: input.reviewed
          ? {
              isNot: {
                id: undefined,
              },
            }
          : undefined,
      },
    };

    const submissions: Submission[] = await prisma.submission.findMany({
      where: {
        ...filters,
      },
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

    const count: number = await prisma.submission.count({ where: filters });

    return { submissions: submissions, count };
  } catch (error) {
    console.error(error);
    return { submissions: undefined, count: 0 };
  }
};
