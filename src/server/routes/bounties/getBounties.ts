import {
  BountyState,
  Prisma,
  PrismaClient,
  RequirementType,
} from '@prisma/client';
import { ThenArg, TRPCError } from '@trpc/server';
import { z } from 'zod';

import { BountyOrderBy } from '@/lib/models/BountyQueryParams';
import { Order } from '@/lib/models/Order';

import { publicProcedure } from '@/server/procedures';

import { ArrayElement } from '../utils/helperTypes';

const stringArray = z.string().array();

const DEFAULT_ORDER = Order.Desc;
/** Params necessary to call `getBountiesWithMetaData`  */

export const GetBountiesSchema = z.object({
  //dropdown
  order: z.nativeEnum(Order).default(DEFAULT_ORDER).optional(),
  orderBy: z.nativeEnum(BountyOrderBy).optional(),
  states: z.nativeEnum(BountyState).array().optional(),
  countries: stringArray.optional(),
  tags: stringArray.optional(),
  types: z.nativeEnum(RequirementType).array().optional(),
  //input
  search: z.string().optional(),
  orgName: z.string().array().optional(),
  targetNames: z.string().array().optional(),
  //range
  minBounty: z.number().optional(),
  maxBounty: z.number().optional(),
  //non user
  amount: z.number().optional(),
  page: z.number().optional(),
});

/** Params necessary to call `getBountiesWithMetaData`  */
export type GetBountiesParams = z.infer<typeof GetBountiesSchema>;

/** Defines how to query the database to obtain `SmallBounty`
 *
 * Exporting this so other queries can also fulfil having a `SmallBounty` in their "includes"
 *
 */
export const SMALL_BOUNTY_SELECTION = Prisma.validator<Prisma.BountySelect>()({
  title: true,
  slug: true,
  description: true,
  closesAt: true,
  _count: true,
  requirements: true,
  status: true,
  acceptMore: true,
  wallet: {
    select: {
      address: true,
      balance: true,
    },
  },
  tags: true,
  target: {
    select: {
      type: true,
      name: true,
      alsoKnownAs: true,
      bio: true,
      org: {
        select: {
          name: true,
          alsoKnownAs: true,
          countries: true,
        },
      },
    },
  },
});

async function getBountiesWithMetaData(
  prisma: PrismaClient,
  input: GetBountiesParams,
  where: Prisma.BountyWhereInput,
  userLoggedIn: boolean
) {
  //TODO: Use the input params to filter the bounties
  const orderBy = {
    ...getOrderBy(input.order ?? DEFAULT_ORDER, input.orderBy),
  };
  const bounties = await prisma.bounty.findMany({
    where,
    orderBy: orderBy,
    skip: (input?.amount ?? 0) * (input?.page ?? 0),
    take: input.amount,
    select: userLoggedIn
      ? SMALL_BOUNTY_SELECTION
      : {
          ...SMALL_BOUNTY_SELECTION,
          wallet: {
            select: {
              address: true,
              balance: false,
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
      notIn: [BountyState.Closed],
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
  });
};

async function countBounties(
  prisma: PrismaClient,
  where: Prisma.BountyWhereInput
) {
  const bounties = await prisma.bounty.count({ where });
  return bounties;
}

export const getBounties = publicProcedure
  .input(GetBountiesSchema)
  .query(async ({ input, ctx: { prisma, session } }) => {
    try {
      const userLoggedIn = !!(session && session.user);
      const where = getWhere(userLoggedIn ? input : {});
      const bounties = await getBountiesWithMetaData(
        prisma,
        input,
        where,
        userLoggedIn
      );
      const count = await countBounties(prisma, where);
      return { bounties, count };
    } catch (error) {
      console.error(error);
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        cause: JSON.stringify(error, null, 2),
        message: 'Unable to query bounties',
      });
    }
  });

/** Array of organizations with Metadata in them */
type BountiesWithMetadata = ThenArg<ReturnType<typeof getBountiesWithMetaData>>;

export type SmallBounty = ArrayElement<BountiesWithMetadata>;
