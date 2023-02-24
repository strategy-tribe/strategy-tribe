import { Prisma, PrismaClient } from '@prisma/client';
import { ThenArg } from '@trpc/server';
import { z } from 'zod';

import { BountyOrderBy } from '@/lib/models/BountyQueryParams';
import { Order } from '@/lib/models/Order';

import { staffOnlyProcedure } from '@/server/procedures';

import { GetBountiesParams, GetBountiesSchema } from '../bounties/getBounties';
import { ArrayElement } from '../utils/helperTypes';

const GetInfoSchema = z.object({
  amount: z.number().optional(),
});

export type GetInfoParams = z.infer<typeof GetInfoSchema>;

const DEFAULT_ORDER = Order.Desc;

async function getUsersInfo(prisma: PrismaClient, input: GetBountiesParams) {
  //TODO: Use the input params to filter the bounties
  const orderBy = {
    ...getOrderBy(input.order ?? DEFAULT_ORDER, input.orderBy),
  };
  const where = getWhere(input);
  const bounties = await prisma.bounty.findMany({
    where,
    orderBy: orderBy,
    skip: (input?.amount ?? 0) * (input?.page ?? 0),
    take: input.amount,
    select: {
      title: true,
      status: true,
      closesAt: true,
      slug: true,
      _count: {
        select: {
          submissions: true,
        },
      },
      wallet: {
        select: {
          balance: true,
        },
      },
      target: {
        select: {
          org: {
            select: {
              name: true,
              countries: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      },
      fingerprints: {
        select: {
          fingerprint: true,
          ipDetails: {
            select: {
              ip: true,
              city: true,
              countyrCode: true,
            },
          },
        },
      },
    },
  });

  return bounties;
}

const getOrderBy = (
  order: Order,
  orderBy?: BountyOrderBy
): Prisma.BountyOrderByWithRelationAndSearchRelevanceInput => {
  if (orderBy) {
    switch (orderBy) {
      case BountyOrderBy.Bounty:
        return {
          wallet: {
            balance: order,
          },
        };
      case BountyOrderBy.CreatedAt:
        return {
          createdAt: order,
        };
      case BountyOrderBy.ClosesAt:
        return {
          closesAt: order,
        };
      case BountyOrderBy.Submissions:
        return {
          submissions: {
            _count: order,
          },
        };
      case BountyOrderBy.Fingerprint:
        return {
          fingerprints: {
            _count: order,
          },
        };
    }
  }
  return {};
};

const getWhere = (input: GetBountiesParams) => {
  return Prisma.validator<Prisma.BountyWhereInput>()({
    target: {
      AND: [
        {
          org: {
            AND: [
              {
                name: {
                  in: input.orgName,
                },
              },
              {
                countries: {
                  some: {
                    name: {
                      in: input.countries,
                    },
                  },
                },
              },
            ],
          },
        },
        {
          name: {
            in: input.targetNames,
          },
        },
      ],
    },
    tags: {
      some: {
        name: {
          in: input.tags,
        },
      },
    },
    status: {
      in: input.states,
    },
    title: {
      search: input.search?.split(' ').join(' & '),
    },
    requirements: {
      some: {
        type: {
          in: input.types,
        },
      },
    },
    fingerprints: {
      some: {
        //   fingerprint: undefined
        ipDetails: {
          some: {
            ip: undefined,
          },
        },
      },
    },
  });
};

export type UsersInfo = ThenArg<ReturnType<typeof getUsersInfo>>;

export type UserInfo = ArrayElement<UsersInfo>;

export const getInfo = staffOnlyProcedure
  .input(GetBountiesSchema)
  .query(async ({ input, ctx: { prisma } }) => {
    const info = await getUsersInfo(prisma, input);
    const count = await prisma.bounty.count({ where: getWhere(input) });
    return { info, count };
  });
