import { Prisma, RequirementType, SubmissionState } from '@prisma/client';

import { CapitalizeFirstLetter, toTitleCase } from '@/lib/utils/StringHelpers';

import prisma from '@/server/prisma/prismaClient';

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
  const types = Object.entries(RequirementType)
    .map((entry) => entry[1])
    .sort();
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
          dataPoints: {
            some: {
              type: typeCase,
            },
          },
        },
      },
    };
  }

  const acceptedSubmissions = await prisma.submission.findMany({
    where,
    select: {
      state: true,
      bounty: {
        select: {
          slug: true,
          title: true,
          SubmissionGraph: {
            select: {
              renderUrl: true,
              isComplete: true,
              dataPoints: {
                select: {
                  type: true,
                  value: true,
                },
              },
            },
          },
          target: {
            select: {
              name: true,
              org: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      },
      answers: {
        select: {
          answer: true,
          requirement: {
            select: {
              title: true,
            },
          },
        },
      },
    },
  });

  const processedAcceptedSubmissions = acceptedSubmissions.map((sub, i) => {
    let data = {};
    const dataPoints = sub.bounty?.SubmissionGraph?.dataPoints;
    if (dataPoints) {
      types.forEach((type) => {
        if (dataPoints.findIndex((d) => d.type === type) >= 0) {
          data = {
            ...data,
            [type]: dataPoints
              .filter((d) => d.type === type)
              .map((d) => d.value),
          };
        }
      });
    }

    return {
      'Serial No': `${i + 1}`,
      Bounty: sub.bounty?.title,
      'Bounty URL': `${process.env.APP_DOMAIN}/bounty/${sub.bounty?.slug}`,
      Target: sub.bounty ? toTitleCase(sub.bounty.target.name) : '',
      Organisation: sub.bounty?.target.org
        ? toTitleCase(sub.bounty.target.org.name)
        : '',
      ...data,
      Research: sub.answers.find((ans) =>
        ans.requirement?.title.includes('How did you find this info')
      )?.answer,
      'Graph URL': sub.bounty?.SubmissionGraph?.isComplete
        ? sub.bounty.SubmissionGraph.renderUrl
        : undefined,
    };
  });
  return {
    count: processedAcceptedSubmissions.length,
    submissions: processedAcceptedSubmissions,
  };
}
