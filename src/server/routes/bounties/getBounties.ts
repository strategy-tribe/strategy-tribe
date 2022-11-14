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

const DEFAULT_ORDER = Order.Desc;
/** Params necessary to call `getBountiesWithMetaData`  */
const GetBountiesSchema = z.object({
  //dropdown
  order: z.nativeEnum(Order).default(DEFAULT_ORDER).optional(),
  orderBy: z.nativeEnum(BountyOrderBy).optional(),
  states: z.nativeEnum(BountyState).array().optional(),
  countries: z.string().array().optional(),
  types: z.nativeEnum(RequirementType).array().optional(),
  tags: z.string().array().optional(),
  //input
  search: z.string().optional(),
  orgName: z.string().array().optional(),
  targetNames: z.string().array().optional(),
  //range
  minBounty: z.number().optional(),
  maxBounty: z.number().optional(),
  //non user
  paginate: z.boolean().optional(),
  amount: z.number().optional(),
  page: z.number().optional(),
  //prob going down
  specificityOfOrgName: z.enum(['Exact', 'Loose']).optional(),
  specificityOfTitle: z.enum(['Exact', 'Loose']).optional(),
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
          tags: true,
        },
      },
    },
  },
});

async function getBountiesWithMetaData(
  prisma: PrismaClient,
  input: GetBountiesParams
) {
  const where = Prisma.validator<Prisma.BountyWhereInput>()({
    target: {
      org: {
        name: { in: input.orgName },
      },
    },
    status: {
      in: input.states,
    },
    title: {
      search: input.search,
    },
  });

  //TODO: Use the input params to filter the bounties
  const orderBy = {
    ...getOrderBy(input.order ?? DEFAULT_ORDER, input.orderBy),
  };
  const bounties = await prisma.bounty.findMany({
    where,
    orderBy: orderBy,
    skip: (input?.amount ?? 0) * (input?.page ?? 0),
    take: input.amount,
    select: SMALL_BOUNTY_SELECTION,
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

async function countBounties(prisma: PrismaClient, input: GetBountiesParams) {
  let where = {};
  if (input.orgName) {
    where = {
      target: {
        org: {
          name: input.orgName,
        },
      },
    };
  }
  if (input.states && input.states.length > 0) {
    where = {
      ...where,
      status: {
        in: input.states,
      },
    };
  }
  //TODO: Use the input params to filter the bounties
  const bounties = await prisma.bounty.count({ where });
  return bounties;
}

export const getBounties = publicProcedure
  .input(GetBountiesSchema)
  .query(async ({ input, ctx: { prisma } }) => {
    try {
      const bounties = await getBountiesWithMetaData(prisma, input);
      const count = await countBounties(prisma, input);
      return { bounties, count };
    } catch (error) {
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
