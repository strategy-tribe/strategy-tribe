import { Prisma, PrismaClient } from '@prisma/client';
import { z } from 'zod';

import { Order } from '@/lib/models/Order';

import { signedInOnlyProcedure } from '@/server/procedures';

import { ArrayElement, ThenArg } from '../utils/helperTypes';

const getArticlesSchema = z.object({
  paginate: z.boolean().optional(),
  amount: z.number().optional(),
  page: z.number().optional(),
});

export type GetArticlesSchemaParams = z.infer<typeof getArticlesSchema>;

export const ARTICLE_SELECTION = Prisma.validator<Prisma.ArticleSelect>()({
  slug: true,
  title: true,
  thumbnail: true,
  summary: true,
  content: true,
  publish: true,
  createdAt: true,
  targets: {
    select: {
      name: true,
    },
  },
});

async function _getArticles(
  input: GetArticlesSchemaParams,
  prisma: PrismaClient,
  isStaff: boolean
) {
  const res = await prisma.article.findMany({
    where: isStaff ? {} : { publish: true },
    skip: (input?.amount ?? 0) * (input?.page ?? 0),
    take: input.amount,
    select: isStaff
      ? ARTICLE_SELECTION
      : {
          ...ARTICLE_SELECTION,
          // publish: false,
        },
    orderBy: {
      createdAt: Order.Desc,
    },
  });

  return res;
}

const countArticles = async (
  input: GetArticlesSchemaParams,
  prisma: PrismaClient,
  isStaff: boolean
) => {
  const count: number = await prisma.article.count({
    where: isStaff ? {} : { publish: true },
  });

  return count;
};

export const getArticles = signedInOnlyProcedure
  .input(getArticlesSchema)
  .query(async ({ ctx: { prisma, session }, input }) => {
    const articles = await _getArticles(
      input,
      prisma,
      !!(session && session?.user && session?.user.rol !== 'REGULAR')
    );
    const count = await countArticles(
      input,
      prisma,
      !!(session && session?.user && session?.user.rol !== 'REGULAR')
    );
    return { articles, count };
  });

/** Array of Articles with Metadata in them */
export type SmallArticles = NonNullable<
  ThenArg<ReturnType<typeof _getArticles>>
>;

export type SmallArticle = ArrayElement<SmallArticles>;
