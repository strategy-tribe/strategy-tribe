import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

import { staffOnlyProcedure } from '@/server/procedures';

/** Schema used to post Article */
const PostArticleSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  thumbnail: z.string(),
  summary: z.string(),
  content: z.string(),
  publish: z.boolean(),
  targets: z.string().array(),
});

export type PostArticleParams = z.infer<typeof PostArticleSchema>;

const CreateArticle = async (
  prisma: PrismaClient,
  input: PostArticleParams
) => {
  const { id, slug, title, summary, content, publish, targets, thumbnail } =
    input;

  const { targets: oldTargets } = (await prisma.article.findUnique({
    where: {
      id,
    },
    select: {
      targets: {
        select: {
          name: true,
        },
      },
    },
  }))!;

  const article = await prisma.article.upsert({
    where: {
      id,
    },
    create: {
      slug,
      title,
      thumbnail,
      summary,
      content,
      publish,
      targets: {
        connect: targets.map((t) => ({ name: t })),
      },
    },
    update: {
      slug,
      title,
      thumbnail,
      summary,
      content,
      publish,
      targets: {
        disconnect: oldTargets.map((t) => ({ name: t.name })),
        connect: targets.map((t) => ({ name: t })),
      },
    },
  });
  return id;
};

export const post = staffOnlyProcedure
  .input(PostArticleSchema)
  .mutation(async ({ input, ctx }) => {
    const id = await CreateArticle(ctx.prisma, input);

    return {
      reviewId: id,
    };
  });
