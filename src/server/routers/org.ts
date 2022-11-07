import { Organization } from '@prisma/client';
import { z } from 'zod';

import prisma from '@/lib/prisma/prismaClient';

import { publicProcedure, router } from '../trpc';

export const orgRouter = router({
  getOrgs: publicProcedure
    .input(
      z.object({
        amount: z.number().optional(),
      })
    )
    .query(async ({ input: { amount } }) => {
      if (amount) {
        const organizations = await prisma.organization.findMany({
          take: amount,
          include: {
            tags: true,
            countries: true,
            targets: {
              include: {
                _count: {
                  select: {
                    bounties: true,
                  },
                },
              },
            },
          },
        });
        return { organizations };
      } else {
        const organizations = await prisma.organization.findMany({
          include: {
            tags: true,
            countries: true,
            targets: {
              include: {
                _count: {
                  select: {
                    bounties: true,
                  },
                },
              },
            },
          },
        });
        return { organizations };
      }
    }),
  getOrg: publicProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().optional(),
      })
    )
    .query(async ({ input }) => {
      const organization: Organization | null =
        await prisma.organization.findUnique({
          where: { id: input.id },
          include: {
            tags: true,
            countries: true,
            targets: {
              include: {
                bounties: {
                  include: {
                    wallet: true,
                  },
                },
                _count: {
                  select: {
                    bounties: true,
                  },
                },
              },
            },
            wallet: true,
          },
        });
      return { organization };
    }),
});
