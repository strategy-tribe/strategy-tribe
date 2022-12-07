import { PrismaClient } from '@prisma/client';
import { ThenArg } from '@trpc/server';
import { z } from 'zod';

import { publicProcedure } from '@/server/procedures';

const GetOrgSchema = z.object({
  name: z.string(),
});

export async function ServerGetOrg(prisma: PrismaClient, params: GetOrgParams) {
  const organization = await prisma.organization.findUnique({
    where: { name: params.name },
    //TODO: Swap include for select
    include: {
      tags: true,
      countries: true,
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

export type FullOrg = NonNullable<ThenArg<ReturnType<typeof ServerGetOrg>>>;

export const getOrg = publicProcedure
  .input(GetOrgSchema)
  .query(async ({ input, ctx: { prisma } }) => {
    const organization = await ServerGetOrg(prisma, input);

    return { organization };
  });
