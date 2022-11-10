import { PrismaClient } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { User } from 'next-auth';
import { z } from 'zod';

import { signedInOnlyProcedure } from '@/server/procedures';

import { ThenArg } from '../utils/helperTypes';
import { SMALL_SUBMISSION_SELECT } from './getSubmissions';

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
    //Add more for this one
    select: {
      ...SMALL_SUBMISSION_SELECT,
      author: {
        select: {
          address: true,
          id: true,
        },
      },
    },
  });

  const isNoSpecial = !isAdmin && !isStaff;
  const authorWasDeleted = !submission?.author;
  const userIsAskingForSomeoneElse = submission?.author?.id !== userId;

  if (isNoSpecial && (authorWasDeleted || userIsAskingForSomeoneElse)) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }

  return submission;
};

export const getSubmission = signedInOnlyProcedure
  .input(GetSubmissionSchema)
  .query(async ({ input, ctx }) => {
    const submission: FullSubmission | null = await _getSubmission(
      ctx.prisma,
      ctx.session.user,
      input
    );

    return { submission };
  });

export type FullSubmission = NonNullable<
  ThenArg<ReturnType<typeof _getSubmission>>
>;
