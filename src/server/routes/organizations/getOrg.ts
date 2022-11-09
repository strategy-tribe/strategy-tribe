import { PrismaClient } from '@prisma/client';
import { ThenArg } from '@trpc/server';
import { z } from 'zod';

import { publicProcedure } from '@/server/procedures';

export const GetOrgSchema = z.object({
  name: z.string(),
});

async function _getOrg(prisma: PrismaClient, params: GetOrgParams) {
  const organization = await prisma.organization.findUnique({
    where: { name: params.name },
    include: {
      tags: {
        select: {
          name: true,
        },
      },
      countries: {
        select: {
          name: true,
          code: true,
        },
      },
      wallet: {
        select: {
          address: true,
          balance: true,
        },
      },
      targets: {
        include: {
          _count: true,
          bounties: {
            select: {
              wallet: {
                select: { balance: true },
              },
            },
          },
        },
      },
    },
  });

  return organization;
}

export type GetOrgParams = z.infer<typeof GetOrgSchema>;

export type FullOrg = NonNullable<ThenArg<ReturnType<typeof _getOrg>>>;

export const getOrg = publicProcedure
  .input(GetOrgSchema)
  .query(async ({ input, ctx: { prisma } }) => {
    const organization = await _getOrg(prisma, input);

    return { organization };
  });
