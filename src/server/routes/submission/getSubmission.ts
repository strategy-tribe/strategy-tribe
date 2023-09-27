import { PrismaClient, Requirement, RequirementType } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { User } from 'next-auth';
import { z } from 'zod';

import { signedInOnlyProcedure } from '@/server/procedures';
import { s3 } from '@/server/routers/files';

import { SMALL_SUBMISSION_SELECT } from './getSubmissions';
import { getSvg } from '../utils/getSvg';
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
    submission = await replaceMermaid(submission);
    return { submission };
  });

const replaceMermaid = async (submission: FullSubmission | null) => {
  if (!(submission && submission.answers && submission.answers.length > 0)) {
    return submission;
  }
  const howAnswer = submission.answers.find(
    (a) => a.requirement?.title === 'How did you find this info'
  );

  if (
    howAnswer &&
    new RegExp(/osint[\s\S]*?start[\s\S]*?->[\s\S]*?D_[\s\S]*?P_/).test(
      howAnswer.answer
    )
  ) {
    const svg = await getSvg(
      howAnswer.answer.replace('start', 'showData start')
    );
    return {
      ...submission,
      answers: [
        ...submission.answers.filter(
          (ans) => ans.requirement?.title !== 'How did you find this info'
        ),
        {
          ...howAnswer,
          answer: svg,
        },
      ],
    };
  }
  return submission;
};

const processImages = async (submission: FullSubmission | null) => {
  if (submission && submission.answers && submission.answers.length > 0) {
    const stringSubmissionParams: FullSubmission = submission;
    const fileSubmissionParams: FullSubmission = {
      ...submission,
      answers: [],
    };
    const imageFileAns = submission.answers.filter(
      (a) => a.requirement?.type === RequirementType.Image
    );
    stringSubmissionParams.answers = submission.answers.filter(
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
  return submission;
};

export type FullSubmission = NonNullable<
  ThenArg<ReturnType<typeof _getSubmission>>
>;
