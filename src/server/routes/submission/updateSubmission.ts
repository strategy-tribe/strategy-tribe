import { PrismaClient } from '@prisma/client';

import { GetSubmissionParams } from './getSubmission';
import { UpdateSubmissionsDataParams } from './updateSubmissions';

export const _updateSubmission = async (
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
