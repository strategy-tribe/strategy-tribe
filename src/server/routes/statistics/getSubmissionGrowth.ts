import { PrismaClient, SubmissionState } from '@prisma/client';
import { z } from 'zod';

import { subtractDays } from '@/server/importer/utils';
import { publicProcedure } from '@/server/procedures';

import { ThenArg } from '../utils/helperTypes';

export async function _getSubmissionsGrowth(prisma: PrismaClient) {
  const submissions = await prisma.submission.findMany({
    orderBy: {
      createdAt: 'asc',
    },
  });
  const accSubs = submissions.filter(
    (sub) => sub.state === SubmissionState.Accepted
  );

  const totalSubmissions: number[] = [];
  const acceptedSubmissions: number[] = [];
  const labels: string[] = [];

  for (let i = 5; i > 0; i--) {
    const date: Date = subtractDays(new Date(), i * 7);
    totalSubmissions.push(
      submissions.filter((sub) => sub.createdAt < date).length
    );
    acceptedSubmissions.push(
      accSubs.filter((sub) => sub.createdAt < date).length
    );
    labels.push(date.toLocaleDateString('en-GB').slice(0, 5));
  }

  totalSubmissions.push(submissions.length);
  acceptedSubmissions.push(accSubs.length);
  labels.push('Today');

  return {
    totalSubmissions,
    acceptedSubmissions,
    labels,
  };
}

export type SubmissionsGrowthData = NonNullable<
  ThenArg<ReturnType<typeof _getSubmissionsGrowth>>
>;

const GetSubmissionsGrowthSchema = z.object({}).optional();

export const getSubmissionGroth = publicProcedure
  .input(GetSubmissionsGrowthSchema)
  .query(async ({ input, ctx: { prisma } }) => {
    const submissionsGrowth = await _getSubmissionsGrowth(prisma);
    return { submissionsGrowth, ...input };
  });
