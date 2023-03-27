import { PrismaClient } from '@prisma/client';
import { TRPCError } from '@trpc/server';

import { PushNotificationLoad } from './onesignal';

export const SendNotifications = async (
  prisma: PrismaClient,
  params: PushNotificationLoad[]
) => {
  const notifications = await prisma.$transaction(
    params.map(({ message, url, user }) =>
      prisma.notification.create({
        data: {
          message,
          urlCallback: url,
          userId: user,
          read: false,
        },
      })
    )
  );

  //Converts the relative url to an absolute one. It also adds the notification id to the url.
  const parsedParams = params.map((p) => {
    const notification = notifications.find((n) => n.userId === p.user);
    const notificationId = notification?.id;

    if (!notificationId) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        cause: 'Unable to find the notification id for a user',
      });
    }

    const newUrl = _CreateNotificationUrl({
      notificationId,
      relativeUrl: p.url,
    });

    return { ...p, url: newUrl };
  });

  //Send them to the user
  //await OneSignal_NotifyMultiple(parsedParams);
};

/** Creates a notification url based on a relative path and the notification ID.
 *
 * Use this to define the url of push notifications
 */
const _CreateNotificationUrl = ({
  notificationId,
  relativeUrl,
}: {
  /** Url relative to the site. ie, /bounty/1234 or /submission/abc */
  relativeUrl: string;
  /** Id of the notification */
  notificationId: string;
}) => {
  const baseUrl = process.env.NEXT_PUBLIC_DOMAIN as string;

  if (!baseUrl) {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      cause: 'Undefined Domain',
      message:
        'Undefined domain, unable to define a url to create notifications',
    });
  }

  //No need to add a slash between baseUrl and relativeUrl
  if (relativeUrl.includes('?')) {
    return `${baseUrl}${relativeUrl}&notificationId=${notificationId}`;
  } else {
    return `${baseUrl}${relativeUrl}?notificationId=${notificationId}`;
  }
};

export const DeleteNotifsAfterReview = async (
  prisma: PrismaClient,
  submissionId: string,
  bountyTitle: string
) => {
  //Submission reviewed, so clear notification for staff/admin
  const newSubmissionNotifs = await prisma.notification.findMany({
    where: {
      AND: {
        urlCallback: `/submission/${submissionId}`,
        message: { contains: `There is a new submission for ${bountyTitle}` },
      },
    },
    select: { id: true },
  });
  const idsToDelete: string[] = [];
  newSubmissionNotifs &&
    newSubmissionNotifs.map((item) => {
      idsToDelete.push(item.id);
    });
  const deletedUserCount = await prisma.notification.deleteMany({
    where: {
      id: {
        in: idsToDelete,
      },
    },
  });
};
