import { PrismaClient } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { User } from 'next-auth';
import { z } from 'zod';

import { signedInOnlyProcedure } from '@/server/procedures';

import { SMALL_BOUNTY_SELECTION } from '../bounties/getBounties';
import { ThenArg } from '../utils/helperTypes';

/** Schema used to query for submissions */
const GetSubmissionSchema = z.object({
  id: z.string(),
});

export type GetSubmissionParams = z.infer<typeof GetSubmissionSchema>;

const _getSubmission = async (
  prisma: PrismaClient,
  user: User,
  input: GetSubmissionParams
) => {
  const { id } = input;
  const userId = user.profileId;
  const isAdmin = user.rol === 'ADMIN';
  const isStaff = user.rol === 'STAFF';

  const submission = await prisma.submission.findUnique({
    where: {
      id: id,
    },
    select: {
      state: true,
      createdAt: true,
      updatedAt: true,
      authorId: true,
      id: true,
      bounty: {
        select: SMALL_BOUNTY_SELECTION,
      },
      answers: {
        select: {
          requirement: true,
          answer: true,
        },
      },
      review: true,
    },
  });

  if (submission?.authorId !== userId || (!isAdmin && !isStaff)) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }

  return submission;
};

export const getSubmission = signedInOnlyProcedure
  .input(GetSubmissionSchema)
  .query(async ({ input, ctx }) => {
    const submission: FullSubmission = await _getSubmission(
      ctx.prisma,
      ctx.session.user,
      input
    );
    return { submission };
  });

export type FullSubmission = NonNullable<
  ThenArg<ReturnType<typeof _getSubmission>>
>;
