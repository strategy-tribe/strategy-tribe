import { PrismaClient, SubmissionState } from '@prisma/client';
import { TRPCError } from '@trpc/server';

import { GetSubmissionParams } from './getSubmission';
import { UpdateSubmissionsDataParams } from './updateSubmissions';
import {
  NotifyUsers_SubmissionAccepted,
  NotifyUsers_SubmissionsRejected,
} from '../notification/submissionts';

const _updateSubmission = async (
  config: GetSubmissionParams,
  input: UpdateSubmissionsDataParams,
  prisma: PrismaClient
) => {
  const data = await prisma.submission.update({
    data: input,
    where: config,
  });
  return data;
};

/** Updates a submission to be accepted. It also notifies the user of this */
export const AcceptAndNotifySubmission = async (
  prisma: PrismaClient,
  submissionId: string
) => {
  const { authorId, bountySlug } = await _updateSubmission(
    {
      id: submissionId,
    },
    {
      state: SubmissionState.Accepted,
    },
    prisma
  );

  if (!authorId || !bountySlug) {
    throw new TRPCError({
      code: 'NOT_FOUND',
      cause: 'Unable to find bounty or author of submission',
      message: `Submission id: ${submissionId}`,
    });
  }

  await NotifyUsers_SubmissionAccepted(prisma, bountySlug, {
    userId: authorId,
    submissionId,
  });
};

/** Updates a submission to be rejected. It also notifies the user of this */
export const RejectAndNotifySubmission = async (
  prisma: PrismaClient,
  submissionId: string
) => {
  const { authorId, bountySlug } = await _updateSubmission(
    {
      id: submissionId,
    },
    {
      state: SubmissionState.Rejected,
    },
    prisma
  );

  if (!authorId || !bountySlug) {
    throw new TRPCError({
      code: 'NOT_FOUND',
      cause: 'Unable to find bounty or author of submission',
      message: `Submission id: ${submissionId}`,
    });
  }

  await NotifyUsers_SubmissionsRejected(prisma, bountySlug, [
    { userId: authorId, submissionId },
  ]);
};
