import { PrismaClient } from '@prisma/client';
import { ThenArg } from '@trpc/server';
import { z } from 'zod';

import { publicProcedure } from '@/server/procedures';

import { ArrayElement } from '../utils/helperTypes';

export const getOrgsWithMetaDataSchema = z.object({
  amount: z.number().optional(),
});

export type GetOrgsWithMetaDataParams = z.infer<
  typeof getOrgsWithMetaDataSchema
>;

async function getOrganizationsWithMetaData(
  prisma: PrismaClient,
  input?: GetOrgsWithMetaDataParams
) {
  const organizations = await prisma.organization.findMany({
    take: input?.amount,
    select: {
      name: true,
      bio: true,
      alsoKnownAs: true,
      wallet: {
        select: {
          address: true,
          balance: true,
        },
      },
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

  return organizations;
}

/** Array of organizations with Metadata in them */
type OrgsWithMetaData = ThenArg<
  ReturnType<typeof getOrganizationsWithMetaData>
>;

/** A version of a organization with slightly less data */
export type SmallOrg = ArrayElement<OrgsWithMetaData>;

export const getOrgs = publicProcedure
  .input(getOrgsWithMetaDataSchema)
  .query(async ({ input, ctx: { prisma } }) => {
    const organizations: OrgsWithMetaData = await getOrganizationsWithMetaData(
      prisma,
      input
    );

    return { organizations };
  });
