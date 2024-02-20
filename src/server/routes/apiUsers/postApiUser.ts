import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

import { staffOnlyProcedure } from '@/server/procedures';

/** Schema used to post ApiUser */
const PostApiUserSchema = z.object({
  id: z.string().optional(),
  isActive: z.boolean(),
  name: z.string(),
  token: z.string(),
  tags: z.string().array(),
});

export type PostApiUserParams = z.infer<typeof PostApiUserSchema>;

const CreateApiUser = async (
  prisma: PrismaClient,
  input: PostApiUserParams
) => {
  const { id, isActive, name, token, tags } = input;
  const apiU = await prisma.apiUser.findFirst({
    where: { id },
    select: {
      id: true,
      tags: {
        select: {
          name: true,
        },
      },
    },
  });
  const data = {
    isActive,
    name,
    token,
    tags: {
      connectOrCreate: tags
        ?.filter((tag) => tag !== '')
        .map((tag) => ({
          create: {
            name: tag,
          },
          where: {
            name: tag,
          },
        })),
    },
  };

  if (apiU) {
    const updateData = {
      ...data,
      tags: {
        disconnect: apiU.tags.map((tag) => ({
          name: tag.name,
        })),
        connectOrCreate: data.tags.connectOrCreate,
      },
    };
    const apiUser = await prisma.apiUser.update({
      where: {
        id: apiU.id,
      },
      data: updateData,
    });
    return apiUser.id;
  }
  const apiUser = await prisma.apiUser.create({
    data,
  });
  return apiUser.id;
};

export const postApiUser = staffOnlyProcedure
  .input(PostApiUserSchema)
  .mutation(async ({ input, ctx }) => {
    const id = await CreateApiUser(ctx.prisma, input);

    return {
      apiUser: id,
    };
  });
