import { PrismaClient } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { signedInOnlyProcedure } from '@/server/procedures';

const MarkAsReadSchema = z.object({
  id: z.string(),
});

const _markNotificationAsRead = async (
  prisma: PrismaClient,
  userId: string,
  notificationId: string
) => {
  //#region //**confirm the notification belongs to the user
  const { userId: notificationOwner } =
    await prisma.notification.findFirstOrThrow({
      where: { id: notificationId },
      select: { userId: true },
    });

  if (notificationOwner !== userId) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      cause: 'User id did not match the owner of the notification',
    });
  }
  //#endregion //**confirm the notification belongs to the user

  const { id } = await prisma.notification.update({
    where: {
      id: notificationId,
    },
    data: {
      read: true,
    },
  });

  return id;
};

export type MarkAsReadParams = z.infer<typeof MarkAsReadSchema>;

export const markAsRead = signedInOnlyProcedure
  .input(MarkAsReadSchema)
  .mutation(async ({ input, ctx }) => {
    await _markNotificationAsRead(ctx.prisma, ctx.session?.user.id, input.id);
  });
