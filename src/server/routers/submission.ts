import { RequirementType, Submission } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { isBountyOpen } from 'server/common/bounties/isBountyOpen';
import { areAnswersValid } from 'server/common/submission/areAnswersValid';
import { getSubmissions } from 'server/common/submission/getSubmissions';
import { spotsLeftForUser } from 'server/common/submission/spotsLeftForUser';
import { z } from 'zod';

import { GetSubmissionsSchema } from '../common/submission/schemas';
import { router, signedInOnlyProcedure, staffOnlyProcedure } from '../trpc';

export const submissionRouter = router({
  post: signedInOnlyProcedure
    .input(
      z.object({
        slug: z.string(),
        answers: z
          .object({
            input: z.union([z.string(), z.instanceof(File).array()]),
            requirement: z.object({
              id: z.string(),
              title: z.string(),
              type: z.nativeEnum(RequirementType),
              optional: z.boolean(),
              bountyId: z.string().nullable(),
            }),
          })
          .array(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { slug, answers } = input;
      const address = ctx.session.user.address;
      const prisma = ctx.prisma;

      //#region  //*=========== 1) User is valid? ===========
      //procedure should take care of this part
      //#endregion  //*=========== 0) User is valid? ===========

      //#region  //*=========== 2) Is the bounty open? ===========
      const canAcceptSubmissions = await isBountyOpen(slug);
      if (!canAcceptSubmissions) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'Cannot submit to close bounties',
        });
      }
      //#endregion  //*=========== 1) Is the bounty open? ===========

      //#region  //*=========== 3) Does the user have submissions left for the day? ===========
      const amount = await spotsLeftForUser(slug, address);
      if (amount < 1) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message:
            'You are not allowed to submit again to this bounty, try again later',
        });
      }
      //#endregion  //*=========== 2) Does the user have submissions left for the day? ===========

      //#region  //*=========== 4) Are the answers submitted valid? ===========
      const areTheAnswersValid = await areAnswersValid(slug, answers);
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
              data: answers.map((a) => {
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

      return {
        submissionId: id,
      };
    }),
  getSubmissions: signedInOnlyProcedure
    .input(GetSubmissionsSchema)
    .query(async ({ input, ctx }) => {
      await getSubmissions(input, ctx.session.user, ctx.prisma);
    }),
  getSubmission: signedInOnlyProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ input: { id }, ctx }) => {
      const userId = ctx.session.user.profileId;
      const isAdmin = ctx.session.user.rol === 'ADMIN';
      const isStaff = ctx.session.user.rol === 'STAFF';
      const prisma = ctx.prisma;

      const submission: Submission | null = await prisma.submission.findUnique({
        where: {
          id: id,
        },
        include: {
          bounty: {
            include: {
              tags: true,
            },
          },
          answers: {
            include: {
              requirement: true,
            },
          },
          review: true,
        },
      });

      if (submission?.authorId !== userId || (!isAdmin && !isStaff)) {
        throw new TRPCError({ code: 'UNAUTHORIZED' });
      }

      return { submission };
    }),
  getSubmitterInfo: staffOnlyProcedure
    .input(
      z.object({
        submitterId: z.string(),
        bountyId: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      const prisma = ctx.prisma;
      try {
        const totalSubmissions: number = await prisma.submission.count({
          where: {
            authorId: input.submitterId,
          },
        });
        const bountySubmissions: number = await prisma.submission.count({
          where: {
            authorId: input.submitterId,
            bountyId: input.bountyId,
          },
        });

        return {
          totalSubmissions,
          bountySubmissions,
        };
      } catch (error) {
        console.error(error);
      }
    }),
});
