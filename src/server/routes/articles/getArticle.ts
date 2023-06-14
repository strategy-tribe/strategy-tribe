import { PrismaClient } from '@prisma/client';
import { ThenArg, TRPCError } from '@trpc/server';
import { z } from 'zod';

import { signedInOnlyProcedure } from '@/server/procedures';

import { ARTICLE_SELECTION } from './getArticles';

const GetArticleSchema = z.object({
  slug: z.string(),
});

/** To be called from the server. Fetches a article by its slug */
export async function ServerGetArticle(
  prisma: PrismaClient,
  params: GetArticleParams,
  isStaff: boolean
) {
  const { slug } = params;
  const article = await prisma.article.findUnique({
    where: { slug },
    select: {
      ...ARTICLE_SELECTION,
      id: true,
      targets: {
        select: {
          name: true,
          org: {
            select: {
              name: true,
              tags: true,
            },
          },
        },
      },
    },
  });

  if (!isStaff && !article?.publish) {
    throw new TRPCError({
      code: 'BAD_REQUEST',
      message: 'Article not found',
    });
  }
  return article;
}

export type GetArticleParams = z.infer<typeof GetArticleSchema>;

export type FullArticle = NonNullable<
  ThenArg<ReturnType<typeof ServerGetArticle>>
>;

export const getArticle = signedInOnlyProcedure
  .input(GetArticleSchema)
  .query(async ({ input, ctx: { prisma, session } }) => {
    const article = await ServerGetArticle(
      prisma,
      input,
      !!(session && session?.user && session?.user.rol !== 'REGULAR')
    );
    return { article };
  });
