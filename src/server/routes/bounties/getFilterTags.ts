import { PrismaClient } from '@prisma/client';
import { ThenArg, TRPCError } from '@trpc/server';
import { z } from 'zod';

import {
  SearchResult,
  SearchResultType,
} from '@/components/pages/explore/filters/utils/types';

import { publicProcedure } from '@/server/procedures';

const GetFilterTags = z.object({
  search: z.string(),
});

export type GetFilterTagsParams = z.infer<typeof GetFilterTags>;

async function _getTags(prisma: PrismaClient, params: GetFilterTagsParams) {
  const { search } = params;
  const promises: Promise<{ name: string }[]>[] = [];

  //Tags
  promises.push(
    prisma.tag.findMany({
      where: {
        name: {
          search,
        },
      },
      select: {
        name: true,
      },
    })
  );

  //Orgs
  promises.push(
    prisma.organization.findMany({
      where: {
        name: {
          search,
        },
      },
      select: {
        name: true,
      },
    })
  );

  //Targets
  promises.push(
    prisma.target.findMany({
      where: {
        name: {
          search,
        },
      },
      select: {
        name: true,
      },
    })
  );

  //countries
  promises.push(
    prisma.country.findMany({
      where: {
        name: {
          search,
        },
      },
      select: {
        name: true,
      },
    })
  );

  const res = await Promise.all(promises);

  const tags = res.at(0) ?? [];
  const orgs = res.at(1) ?? [];
  const targets = res.at(2) ?? [];
  const countries = res.at(3) ?? [];

  return { tags, orgs, targets, countries };
}

export type FullBounty = NonNullable<ThenArg<ReturnType<typeof _getTags>>>;

export const getFilterTags = publicProcedure
  .input(GetFilterTags)
  .query(async ({ input, ctx: { prisma } }) => {
    try {
      const { orgs, tags, targets, countries } = await _getTags(prisma, input);

      const orgResults: SearchResult[] =
        orgs.map((org) => ({
          name: org.name,
          type: SearchResultType.Organization,
        })) ?? [];
      const tagResults: SearchResult[] = tags.map((org) => ({
        name: org.name,
        type: SearchResultType.Tag,
      }));
      const targetResults: SearchResult[] = targets.map((org) => ({
        name: org.name,
        type: SearchResultType.Person,
      }));
      const countryResults: SearchResult[] = countries.map((org) => ({
        name: org.name,
        type: SearchResultType.Country,
      }));

      const results = orgResults
        .concat(tagResults)
        .concat(targetResults)
        .concat(countryResults);

      return { results };
    } catch (error) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        cause: error,
        message: 'Unable to find tags',
      });
    }
  });
