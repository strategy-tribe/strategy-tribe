import { BountyState, PrismaClient, SubmissionState } from '@prisma/client';
import { z } from 'zod';

import { staffOnlyProcedure } from '@/server/procedures';

import { ThenArg } from '../utils/helperTypes';

export const _getBulkSubmissions = async (prisma: PrismaClient) => {
  const allSubmissions = await prisma.submission.findMany({
    select: {
      state: true,
      bounty: {
        select: {
          title: true,
        },
      },
      answers: {
        select: {
          answer: true,
          requirement: {
            select: {
              title: true,
            },
          },
        },
      },
    },
  });

  const completedTargets = await prisma.target.findMany({
    where: {
      bounties: {
        every: {
          status: BountyState.Closed,
        },
        some: {
          submissions: {
            some: {
              state: SubmissionState.Accepted,
            },
          },
        },
      },
    },
    select: {
      name: true,
      org: {
        select: {
          name: true,
        },
      },
      bounties: {
        select: {
          title: true,
          invoices: {
            select: {
              submission: {
                select: {
                  answers: {
                    select: {
                      answer: true,
                      requirement: {
                        select: {
                          title: true,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  });

  const acceptedSubmissions = await prisma.submission.findMany({
    where: {
      state: SubmissionState.Accepted,
    },
    select: {
      state: true,
      bounty: {
        select: {
          title: true,
        },
      },
      answers: {
        select: {
          answer: true,
          requirement: {
            select: {
              title: true,
            },
          },
        },
      },
    },
  });

  return {
    allSubmissions,
    acceptedSubmissions,
    completedTargets,
  };
};

export const getBulkSubmissions = staffOnlyProcedure
  .input(z.object({}))
  .query(async ({ ctx }) => {
    const bulkSubmissions: BulkSubmissions = await _getBulkSubmissions(
      ctx.prisma
    );

    return bulkSubmissions;
  });

export type BulkSubmissions = ThenArg<ReturnType<typeof _getBulkSubmissions>>;
