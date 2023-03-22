import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

import { publicProcedure } from '@/server/procedures';

import { ThenArg } from '../utils/helperTypes';

export async function _getSubmissionsStatusData(prisma: PrismaClient) {
  const submissionsStatusData = await prisma.submission.findMany({
    select: {
      id: true,
      state: true,
      answers: {
        select: {
          requirement: {
            select: {
              type: true,
            },
          },
        },
      },
    },
  });
  const totalSubmissions = submissionsStatusData?.length;
  let acceptedSubmissions = 0;
  let rejectedSubmissions = 0;
  let waitingForReviewSubmissions = 0;
  let walletCount = 0;
  let nameCount = 0;
  let domainCount = 0;
  let emailCount = 0;
  submissionsStatusData &&
    submissionsStatusData.forEach((item: any) => {
      const submittedData = item.answers;
      switch (item.state) {
        case 'Accepted':
          acceptedSubmissions++;
          break;
        case 'Rejected':
          rejectedSubmissions++;
          break;
        case 'WaitingForReview':
          waitingForReviewSubmissions++;
          break;
        default:
          break;
      }
      submittedData &&
        submittedData.forEach((data: any) => {
          if (data?.requirement?.type === 'Wallet') {
            walletCount++;
          }
          if (data?.requirement?.type === 'Name') {
            nameCount++;
          }
          if (data?.requirement?.type === 'Domain') {
            domainCount++;
          }
          if (data?.requirement?.type === 'Email') {
            emailCount++;
          }
        });
    });
  const processedSubmissionStatesData = {
    total: totalSubmissions,
    acceptedSubmissions: acceptedSubmissions,
    rejectedSubmissions: rejectedSubmissions,
    waitingForReviewSubmissions: waitingForReviewSubmissions,
    typesOfData: {
      walletCount: walletCount,
      nameCount: nameCount,
      domainCount: domainCount,
      emailCount: emailCount,
    },
  };
  return processedSubmissionStatesData;
}

export type SubmissionsStatusData = NonNullable<
  ThenArg<ReturnType<typeof _getSubmissionsStatusData>>
>;

const GetSubmissionsDataSchema = z.object({}).optional();

export const getSubmissionsStatus = publicProcedure
  .input(GetSubmissionsDataSchema)
  .query(async ({ input, ctx: { prisma } }) => {
    const submissionData = await _getSubmissionsStatusData(prisma);
    return { submissionData, ...input };
  });
