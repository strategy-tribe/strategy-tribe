import { Prisma, RequirementType, SubmissionState } from '@prisma/client';

import { CapitalizeFirstLetter } from '@/lib/utils/StringHelpers';

import prisma from '@/server/prisma/prismaClient';

import { types } from './utils';
import { getDataDump } from '../routes/submission/submissionDump/getSubmissionDump';

export async function SubmissionData(
  token: string,
  type: RequirementType | undefined
) {
  const apiUser = await prisma.apiUser.findUnique({
    where: {
      token,
    },
    select: {
      tags: true,
      isActive: true,
    },
  });
  if (!(apiUser && apiUser.isActive)) {
    throw new Error('Unauthourized. Invalid Token');
  }

  let where;
  where = Prisma.validator<Prisma.SubmissionWhereInput>()({
    state: SubmissionState.Accepted,
    bounty: {
      tags:
        apiUser.tags.length > 0
          ? {
              some: {
                name: {
                  in: apiUser.tags.map((tag) => tag.name),
                },
              },
            }
          : undefined,
      SubmissionGraph: {
        isDataPointsVerified: true,
        dataPoints: {
          some: {
            type: {
              in: types,
            },
          },
        },
      },
    },
  });
  if (type) {
    const typeCase = CapitalizeFirstLetter(
      type.trim(),
      false
    ) as RequirementType;
    if (types.indexOf(typeCase) < 0) {
      throw new Error(`Invalid Type. Try one of these: ${types.join(', ')}`);
    }
    where = {
      ...where,
      bounty: {
        ...where.bounty,
        SubmissionGraph: {
          isDataPointsVerified: true,
          dataPoints: {
            some: {
              type: typeCase,
            },
          },
        },
      },
    };
  }

  const processedAcceptedSubmissions = await getDataDump({}, prisma, where);

  return {
    count: processedAcceptedSubmissions.length,
    submissions: processedAcceptedSubmissions,
  };
}
