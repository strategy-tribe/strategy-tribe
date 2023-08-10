import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

import { signedInOnlyProcedure } from '@/server/procedures';

const MarkManyAsReadSchema = z.object({
  ids: z.string().array().nonempty({
    message: 'pass at least 1 notification id',
  }),
});

export type MarkAsReadParams = z.infer<typeof MarkManyAsReadSchema>;

const _markManyNotificationAsRead = async (
  prisma: PrismaClient,
  userId: string,
  params: MarkAsReadParams
) => {
  const { ids } = params;

  await prisma.notification.updateMany({
    data: {
      read: true,
    },
    where: {
      AND: {
        userId,
        id: {
          in: ids,
        },
      },
    },
  });
};

export const markManyAsRead = signedInOnlyProcedure
  .input(MarkManyAsReadSchema)
  .mutation(async ({ input, ctx }) => {
    await _markManyNotificationAsRead(ctx.prisma, ctx.session?.user.id, input);
  });
