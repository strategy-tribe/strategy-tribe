import { PrismaClient } from '@prisma/client';
import { TRPCError } from '@trpc/server';

/** Returns a date X days behind today */
function getThisManyDaysBehind(days = 1) {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date;
}

/** Returns the amount of submissions left for a user in regards to a bounty. */
export const spotsLeftForUser = async (
  bountySlug: string,
  userAddress: string,
  prisma: PrismaClient
): Promise<number> => {
  const last24Hours = getThisManyDaysBehind(1);

  //find the submissions to this bounty by this user.
  const subs = await prisma.submission.count({
    where: {
      AND: {
        bounty: { slug: bountySlug },
        author: { address: userAddress },
        createdAt: {
          gt: last24Hours,
        },
      },
    },
  });

  const subsPerDay = parseInt(process.env.SUBMISSION_PER_DAY as string);

  if (!subsPerDay) {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      cause: 'Unable to assess submissions per day',
      message: process.env.SUBMISSION_PER_DAY,
    });
  }

  const spotsLeft = subsPerDay - subs;

  return spotsLeft;
};
