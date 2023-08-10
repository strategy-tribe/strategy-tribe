import { PrismaClient, Requirement, RequirementType } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { User } from 'next-auth';
import { z } from 'zod';

import { signedInOnlyProcedure } from '@/server/procedures';
import { s3 } from '@/server/routers/files';

import { SMALL_SUBMISSION_SELECT } from './getSubmissions';
import { ThenArg } from '../utils/helperTypes';

/** Schema used to query for submissions */
const GetSubmissionSchema = z.object({
  id: z.string(),
});

export type GetSubmissionParams = z.infer<typeof GetSubmissionSchema>;

export const _getSubmission = async (
  prisma: PrismaClient,
  user: User,
  input: GetSubmissionParams
) => {
  const { id } = input;
  const userId = user.id;
  const isAdmin = user.rol === 'ADMIN';
  const isStaff = user.rol === 'STAFF';
  const isAssociate = user.rol === 'ASSOCIATE';

  const submission = await prisma.submission.findUnique({
    where: {
      id: id,
    },
    //Add more for this one
    select: SMALL_SUBMISSION_SELECT,
  });

  const isNoSpecial = !isAdmin && !isStaff && !isAssociate;
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
    let submission: FullSubmission | null = await _getSubmission(
      ctx.prisma,
      ctx.session.user,
      input
    );
    submission = await processImages(submission);
    return { submission };
  });

const processImages = async (submissions: FullSubmission | null) => {
  if (submissions && submissions.answers && submissions.answers.length > 0) {
    const stringSubmissionParams: FullSubmission = submissions;
    const fileSubmissionParams: FullSubmission = {
      ...submissions,
      answers: [],
    };
    const imageFileAns = submissions.answers.filter(
      (a) => a.requirement?.type === RequirementType.Image
    );
    stringSubmissionParams.answers = submissions.answers.filter(
      (a) => a.requirement?.type !== RequirementType.Image
    );
    if (imageFileAns && imageFileAns.length > 0) {
      let processedImgFileAns: {
        answer: string;
        requirement: Requirement | null;
      }[] = [];
      processedImgFileAns = await Promise.all(
        imageFileAns.map(async (params) => {
          const url = await s3.getSignedUrlPromise('getObject', {
            Key: params.answer,
            Bucket: process.env.OUR_AWS_BUCKET_NAME,
          });
          return { ...params, answer: url };
        })
      );
      fileSubmissionParams.answers = processedImgFileAns;
    }
    stringSubmissionParams.answers.push(...fileSubmissionParams.answers);
    return stringSubmissionParams;
  }
  return submissions;
};

export type FullSubmission = NonNullable<
  ThenArg<ReturnType<typeof _getSubmission>>
>;
