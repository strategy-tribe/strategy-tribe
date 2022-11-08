import { Organization } from '@prisma/client';
import { z } from 'zod';

import { publicProcedure, router } from '../procedures';

export const orgRouter = router({
  getOrgs: publicProcedure
    .input(
      z.object({
        amount: z.number().optional(),
      })
    )
    .query(async ({ input: { amount }, ctx: { prisma } }) => {
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
    .query(async ({ input, ctx: { prisma } }) => {
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
