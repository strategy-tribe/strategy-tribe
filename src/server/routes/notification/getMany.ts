import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

import { signedInOnlyProcedure } from '@/server/procedures';

import { NOTIFICATION_SELECTOR } from './getNotification';

const GetManyNotificationSchema = z.object({
  amount: z.number().gt(0),
  page: z.number().nonnegative(),
});

async function _getManyNotifications(
  prisma: PrismaClient,
  userId: string,
  params: GetManyNotificationsParams
) {
  const { amount, page } = params;
  const notification = await prisma.notification.findMany({
    where: { userId },
    take: amount,
    skip: page,
    select: NOTIFICATION_SELECTOR,
  });

  return notification;
}

export type GetManyNotificationsParams = z.infer<
  typeof GetManyNotificationSchema
>;

export const getManyNotifications = signedInOnlyProcedure
  .input(GetManyNotificationSchema)
  .query(async ({ input, ctx: { prisma, session } }) => {
    const notification = await _getManyNotifications(
      prisma,
      session.user.id,
      input
    );

    return { notification };
  });
