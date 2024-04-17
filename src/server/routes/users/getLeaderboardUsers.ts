import { PrismaClient, SubmissionState } from '@prisma/client';
import { ThenArg } from '@trpc/server';
import { z } from 'zod';

import { MultipleSubBounties } from '@/components/pages/explore/filters/utils/types';

import { publicProcedure } from '@/server/procedures';

import { ArrayElement } from '../utils/helperTypes';

const GetLeaderboardUsersSchema = z.object({
  amount: z.number().optional(),
});

export type GetLeaderboardUsersParams = z.infer<
  typeof GetLeaderboardUsersSchema
>;

export type LeaderboardUsers = NonNullable<
  ThenArg<ReturnType<typeof _getLeaderboardUsers>>
>;

export type LeaderboardUser = ArrayElement<LeaderboardUsers>;

/** To be called from the server. Fetches a LeaderboardUsers by its slug */
export async function _getLeaderboardUsers(
  prisma: PrismaClient,
  input?: GetLeaderboardUsersParams
) {
  const users = await prisma.user.findMany({
    take: input?.amount,
    where: {
      submissions: {
        some: {
          state: SubmissionState.Accepted,
        },
      },
    },
    orderBy: {
      submissions: {
        _count: 'desc',
      },
    },
    select: {
      username: true,
      submissions: {
        select: {
          state: true,
          bounty: {
            select: {
              slug: true,
              wallet: {
                select: {
                  balance: true,
                },
              },
            },
          },
        },
      },
      _count: {
        select: {
          submissions: true,
        },
      },
    },
  });
  const leaderboard: {
    username: string;
    totalSubmissions: number;
    acceptedCount: number;
    highestBounty: number;
    totalBounty: number;
  }[] = [];
  users.forEach((user) => {
    const totalSubmissions = user._count.submissions;
    const acceptedSubmissions = user.submissions.filter(
      (sub) => sub.state === SubmissionState.Accepted
    );
    const multipleSubmissionAcceptingBounties = JSON.parse(
      process.env.MULTIPLE_SUBMISSION_ACCEPTING_BOUNTIES || '[]'
    );
    acceptedSubmissions.forEach((sub) => {
      const matchingBounty = multipleSubmissionAcceptingBounties.find(
        (bounty: MultipleSubBounties) => bounty.bountySlug === sub.bounty?.slug
      );
      if (matchingBounty) {
        sub.bounty!.wallet.balance = matchingBounty.invoiceAmount;
      }
    });
    const highestBounty =
      acceptedSubmissions
        .map((sub) => sub.bounty?.wallet.balance)
        .sort((a, b) => (b ?? 0) - (a ?? 0))[0] ?? 0;
    const totalBounty = acceptedSubmissions
      .map((sub) => sub.bounty?.wallet.balance)
      .reduce((sum: any, count: any) => sum + count, 0);
    leaderboard.push({
      username:
        user.username && user.username !== '' ? user.username : 'Anonymous',
      totalSubmissions,
      acceptedCount: acceptedSubmissions.length,
      highestBounty: Math.round(highestBounty * 100) / 100,
      totalBounty: Math.round(totalBounty * 100) / 100,
    });
  });
  leaderboard.sort((a, b) => b.totalBounty - a.totalBounty);
  return leaderboard.slice(0, 10);
}

export const getLeaderboardUsers = publicProcedure
  .input(GetLeaderboardUsersSchema)
  .query(async ({ input, ctx: { prisma } }) => {
    const users = await _getLeaderboardUsers(prisma);
    return { users };
  });
