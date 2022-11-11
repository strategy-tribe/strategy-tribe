import { PrismaClient } from '@prisma/client';

import {
  OneSignal_NotifyMultiple,
  OneSignalNotificationLoad,
} from './onesignal';

export const SenNotifications = async (
  prisma: PrismaClient,
  params: OneSignalNotificationLoad[]
) => {
  await prisma.notification.createMany({
    data: params.map(({ message, url, user }) => {
      return {
        message,
        urlCallback: url,
        userId: user,
        include: {},
        read: false,
      };
    }),
  });

  //Send them to the user
  await OneSignal_NotifyMultiple(params);
};

export const markNotificationAsRead = async (
  prisma: PrismaClient,
  notificationId: string
) => {
  await prisma.notification.update({
    where: {
      id: notificationId,
    },
    data: {
      read: true,
    },
  });
};
