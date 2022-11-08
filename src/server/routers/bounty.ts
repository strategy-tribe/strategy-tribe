import { Bounty, BountyState } from '@prisma/client';
import { z } from 'zod';

import { BountyOrderBy } from '@/lib/models/BountyQueryParams';
import { Order } from '@/lib/models/Order';

import { publicProcedure, router } from '../procedures';

export const bountyRouter = router({
  getBounty: publicProcedure
    .input(
      z.object({
        slug: z.string(),
      })
    )
    .query(async ({ input: { slug }, ctx: { prisma } }) => {
      const bounty: Bounty | null = await prisma.bounty.findUnique({
        where: { slug },
        include: {
          _count: {
            select: {
              submissions: true,
            },
          },
          requirements: true,
          wallet: true,
          tags: true,
          target: {
            include: {
              org: {
                include: {
                  tags: true,
                  countries: true,
                  _count: {
                    select: {
                      targets: true,
                    },
                  },
                },
              },
            },
          },
        },
      });
      return { bounty };
    }),
  getBounties: publicProcedure
    .input(
      z.object({
        order: z.nativeEnum(Order),
        orderBy: z
          .enum([
            BountyOrderBy.Bounty,
            BountyOrderBy.ClosesAt,
            BountyOrderBy.CreatedAt,
            BountyOrderBy.Submissions,
          ])
          .optional(),
        searchTerm: z.string().optional(),
        paginate: z.boolean().optional(),
        amount: z.number().optional(),
        states: z
          .enum([
            BountyState.Closed,
            BountyState.Open,
            BountyState.PaymentNeeded,
            BountyState.WaitingForFunds,
          ])
          .array()
          .optional(),
        orgId: z.string().optional(),
        relatedTo: z.string().array().optional(),
        specificityOfOrgName: z.enum(['Exact', 'Loose']).optional(),
        specificityOfTitle: z.enum(['Exact', 'Loose']).optional(),
        minBounty: z.number().optional(),
        maxBounty: z.number().optional(),
        countries: z.string().array().optional(),
        page: z.number().optional(),
      })
    )
    .query(async ({ input, ctx: { prisma } }) => {
      try {
        let where = {};
        if (input.orgId) {
          where = {
            target: {
              org: {
                id: input.orgId,
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
        const bounties: Bounty[] = await prisma.bounty.findMany({
          where,
          orderBy: getOrderBy(input.order, input.orderBy),
          skip: (input?.amount ?? 0) * (input?.page ?? 0),
          take: input.amount,
          include: {
            _count: {
              select: {
                submissions: true,
              },
            },
            requirements: true,
            wallet: true,
            tags: true,
            target: {
              include: {
                org: {
                  include: {
                    tags: true,
                    countries: true,
                    _count: {
                      select: {
                        targets: true,
                      },
                    },
                  },
                },
              },
            },
          },
        });

        return { bounties };
      } catch (error) {
        console.error(error);
      }
    }),
  getTotalCount: publicProcedure
    .input(
      z.object({
        searchTerm: z.string().optional(),
        amount: z.number().optional(),
        states: z
          .enum([
            BountyState.Closed,
            BountyState.Open,
            BountyState.PaymentNeeded,
            BountyState.WaitingForFunds,
          ])
          .array()
          .optional(),
        orgId: z.string().optional(),
        relatedTo: z.string().array().optional(),
        specificityOfOrgName: z.enum(['Exact', 'Loose']).optional(),
        specificityOfTitle: z.enum(['Exact', 'Loose']).optional(),
        minBounty: z.number().optional(),
        maxBounty: z.number().optional(),
        countries: z.string().array().optional(),
        page: z.number().optional(),
      })
    )
    .query(async ({ input, ctx: { prisma } }) => {
      try {
        let where = {};
        if (input.orgId) {
          where = {
            target: {
              org: {
                id: input.orgId,
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
        const bountiesCount: number = await prisma.bounty.count({
          where,
        });

        return { bountiesCount };
      } catch (error) {
        console.error(error);
      }
    }),
});

const getOrderBy = (order: Order, orderBy?: BountyOrderBy) => {
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
