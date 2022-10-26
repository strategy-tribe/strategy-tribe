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
          },
        });
        return { organizations };
      } else {
        const organizations = await prisma.organization.findMany({
          include: {
            tags: true,
            countries: true,
          },
        });
        return { organizations };
      }
    }),
  getOrg: publicProcedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .query(async ({ input: { name } }) => {
      const organization: Organization | null =
        await prisma.organization.findUnique({
          where: {
            name,
          },
          include: {
            tags: true,
            countries: true,
            targets: {
              include: {
                bounties: true,
              },
            },
          },
        });
      return { organization };
    }),
});
