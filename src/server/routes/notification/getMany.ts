import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

import { signedInOnlyProcedure } from '@/server/procedures';

import { NOTIFICATION_SELECTOR } from './getNotification';

const GetManyNotificationSchema = z.object({
  amount: z.number().gt(0).optional(),
  page: z.number().nonnegative().optional(),
  onlyUnread: z.boolean().optional(),
});

async function _getManyNotifications(
  prisma: PrismaClient,
  userId: string,
  params: GetManyNotificationsParams
) {
  const { amount, page, onlyUnread } = params;
  const notification = await prisma.notification.findMany({
    where: {
      AND: {
        userId,
        read: onlyUnread,
      },
    },
    // where: { userId },
    take: amount,
    skip: page,
    select: NOTIFICATION_SELECTOR,
  });

  return notification;
}

export type GetManyNotificationsParams = z.infer<
  typeof GetManyNotificationSchema
>;

const countNotifications = async (
  prisma: PrismaClient,
  userId: string,
  params: GetManyNotificationsParams
) => {
  const count: number = await prisma.notification.count({
    where: { userId },
  });

  return count;
};

export const getManyNotifications = signedInOnlyProcedure
  .input(GetManyNotificationSchema)
  .query(async ({ ctx, input }) => {
    const notifications = await _getManyNotifications(
      ctx.prisma,
      ctx.session.user.id,
      input
    );
    const count = await countNotifications(
      ctx.prisma,
      ctx.session.user.id,
      input
    );
    return { notifications, count };
  });
