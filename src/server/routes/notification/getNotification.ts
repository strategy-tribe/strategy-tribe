import { Prisma, PrismaClient } from '@prisma/client';
import { ThenArg, TRPCError } from '@trpc/server';
import { z } from 'zod';

import { signedInOnlyProcedure } from '@/server/procedures';

const GetNotificationSchema = z.object({
  id: z.string(),
});

/** Defines which parts of a notification to send to client */
export const NOTIFICATION_SELECTOR =
  Prisma.validator<Prisma.NotificationSelect>()({
    id: true,
    userId: true,
    message: true,
    read: true,
    createdAt: true,
    updatedAt: true,
    urlCallback: true,
  });

async function _getNotification(
  prisma: PrismaClient,
  params: GetNotificationParams
) {
  const { id } = params;
  const notification = await prisma.notification.findUnique({
    where: { id },
    select: NOTIFICATION_SELECTOR,
  });

  return notification;
}

export type GetNotificationParams = z.infer<typeof GetNotificationSchema>;

export type FullNotification = NonNullable<
  ThenArg<ReturnType<typeof _getNotification>>
>;

export const getNotification = signedInOnlyProcedure
  .input(GetNotificationSchema)
  .query(async ({ input, ctx: { prisma } }) => {
    const notification = await _getNotification(prisma, input);

    if (notification?.userId !== input.id) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        cause: 'User id did not match owner of the notification',
      });
    }

    return { notification };
  });
