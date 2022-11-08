import prisma from '@/lib/prisma/prismaClient';

/** Returns a date X days behind today */
function getThisManyDaysBehind(days = 1) {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date;
}

const SUBMISSION_PER_DAY = 3;

/** Returns the amount of submissions left for a user in regards to a bounty. */
export const spotsLeftForUser = async (
  bountySlug: string,
  userAddress: string
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

  const spotsLeft = subs - SUBMISSION_PER_DAY;

  return spotsLeft;
};
