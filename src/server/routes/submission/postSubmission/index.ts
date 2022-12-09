import { PrismaClient } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { User } from 'next-auth';
import { z } from 'zod';

import { signedInOnlyProcedure } from '@/server/procedures';

import { areAnswersValid } from './areAnswersValid';
import { UserInputSchema } from './UserInput';
import { isBountyOpen } from '../../utils/isBountyOpen';
import { spotsLeftForUser } from '../../utils/spotsLeftForUser';

/** Schema used to query for submissions */
const PostSubmissionSchema = z.object({
  slug: z.string(),
  answers: UserInputSchema.array(),
});

export type PostSubmissionParams = z.infer<typeof PostSubmissionSchema>;

const _postSubmission = async (
  prisma: PrismaClient,
  input: PostSubmissionParams,
  user: User
) => {
  const { slug, answers } = input;
  const address = user.address;

  //#region  //*=========== 1) User is valid? ===========
  //procedure should take care of this part
  //#endregion  //*=========== 0) User is valid? ===========

  //#region  //*=========== 2) Is the bounty open? ===========
  const canAcceptSubmissions = await isBountyOpen(slug, prisma);
  if (!canAcceptSubmissions) {
    throw new TRPCError({
      code: 'FORBIDDEN',
      message: 'Cannot submit to close bounties',
    });
  }
  //#endregion  //*=========== 1) Is the bounty open? ===========

  //#region  //*=========== 3) Does the user have submissions left for the day? ===========
  const amount = await spotsLeftForUser(slug, address, prisma);
  if (amount < 1) {
    throw new TRPCError({
      code: 'FORBIDDEN',
      message:
        'You are not allowed to submit again to this bounty, try again later',
    });
  }
  //#endregion  //*=========== 2) Does the user have submissions left for the day? ===========

  //#region  //*=========== 4) Are the answers submitted valid? ===========
  const areTheAnswersValid = await areAnswersValid(
    slug,
    answers.filter((a) => !a.requirement.optional),
    prisma
  );
  if (!areTheAnswersValid) {
    throw new TRPCError({
      code: 'FORBIDDEN',
      message: 'Your answers are not valid',
    });
  }
  //#endregion  //*=========== 3) Are the answers submitted valid? ===========

  const { id } = await prisma.submission.create({
    data: {
      state: 'WaitingForReview',
      answers: {
        createMany: {
          data: answers
            .filter((a) => a.input !== '')
            .map((a) => {
              if (typeof a.input !== 'string') {
                throw new Error('File support has not been implemented');
              }

              return {
                answer: a.input,
                requirementId: a.requirement.id,
              };
            }),
        },
      },
      author: {
        connect: {
          address: address,
        },
      },
      bounty: {
        connect: {
          slug,
        },
      },
    },
  });

  return id;
};

export const postSubmission = signedInOnlyProcedure
  .input(PostSubmissionSchema)
  .mutation(async ({ input, ctx }) => {
    const id = await _postSubmission(ctx.prisma, input, ctx.session.user);
    return {
      submissionId: id,
    };
  });
