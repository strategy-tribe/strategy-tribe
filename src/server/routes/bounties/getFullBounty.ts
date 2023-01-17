import { Prisma, PrismaClient, RequirementType } from '@prisma/client';
import { ThenArg } from '@trpc/server';
import { z } from 'zod';

import { staffOnlyProcedure } from '@/server/procedures';

import { ArrayElement } from '../utils/helperTypes';

/** Params necessary to call `getFullBounty`  */
const GetFullBountySchema = z.object({
  //dropdown
  types: z.nativeEnum(RequirementType).array().optional(),
  //ids
  slugs: z.string().array().optional(),
  //input
  search: z.string().optional(),
  orgName: z.string().array().optional(),
  targetNames: z.string().array().optional(),
});

/** Params necessary to call `getFullBounty`  */
export type GetFullBountyParams = z.infer<typeof GetFullBountySchema>;

const getWhere = (input: GetFullBountyParams) => {
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
    slug: {
      in: input.slugs,
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

export async function GetFullBounty(
  prisma: PrismaClient,
  input: GetFullBountyParams
) {
  const bounties = await prisma.bounty.findMany({
    where: getWhere(input),
    include: {
      tags: true,
      target: {
        include: {
          org: {
            include: {
              tags: true,
              countries: true,
            },
          },
        },
      },
    },
  });

  return bounties;
}

export type FullBountyArray = NonNullable<
  ThenArg<ReturnType<typeof GetFullBounty>>
>;

export type FullBounty = ArrayElement<FullBountyArray>;

export const getFullBounty = staffOnlyProcedure
  .input(GetFullBountySchema)
  .query(async ({ input, ctx: { prisma } }) => {
    const bounties = await GetFullBounty(prisma, input);
    return { bounties };
  });
