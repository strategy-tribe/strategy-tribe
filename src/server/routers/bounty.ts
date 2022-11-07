import { Bounty, BountyState } from '@prisma/client';
import { z } from 'zod';

import { BountyOrderBy } from '@/lib/models/BountyQueryParams';
import { Order } from '@/lib/models/Order';
import prisma from '@/lib/prisma/prismaClient';

import { publicProcedure, router } from '../trpc';

export const bountyRouter = router({
  getBounty: publicProcedure
    .input(
      z.object({
        slug: z.string(),
      })
    )
    .query(async ({ input: { slug } }) => {
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
        order: z.enum([Order.Asc, Order.Desc]),
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
    .query(async ({ input, ctx }) => {
      // console.log(ctx.session);
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
        //TODO: Use the input params to filter the bounties
        const bounties: Bounty[] = await prisma.bounty.findMany({
          where,
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
    .query(async ({ input }) => {
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
        const bountiesCount: number = await prisma.bounty.count({
          where,
        });

        return { bountiesCount };
      } catch (error) {
        console.error(error);
      }
    }),
});
