import { PrismaClient } from '@prisma/client';

import { GoToBountyPage } from '@/lib/utils/Routes';

import { PushNotificationLoad } from './onesignal';
import { SendNotifications } from './utils';

/** Notify users subscribed to this org that new bounties are added to this org */
export const Notify_NewBountyAddedToOrg = async (
  prisma: PrismaClient,
  orgName: string,
  bountyTitle: string,
  bountySlug: string
) => {
  const message = `A new bounty has been added under the organization - ${orgName}`;
  const subscribedUsersData = await prisma.watchOrganization.findMany({
    where: {
      org: {
        name: orgName,
      },
    },
    select: {
      id: true,
      userId: true,
    },
  });
  subscribedUsersData &&
    subscribedUsersData.map(async (data) => {
      const notification: PushNotificationLoad = {
        user: data.userId,
        message: message,
        url: GoToBountyPage(bountySlug),
      };
      await SendNotifications(prisma, [notification]);
      await prisma.watchBounty.create({
        data: {
          bounty: {
            connect: {
              slug: bountySlug,
            },
          },
          user: {
            connect: {
              id: data.userId,
            },
          },
          subscribedOrg: {
            connect: {
              id: data.id,
            },
          },
        },
      });
    });
};

export const Notify_BountyFundOrStatusChanges = async (
  prisma: PrismaClient,
  bountySlug: string,
  text: string,
  fundChange: boolean
) => {
  const { title: bountyTitle } = await prisma.bounty.findUniqueOrThrow({
    where: {
      slug: bountySlug,
    },
    select: { title: true },
  });
  const message = fundChange
    ? `The bounty fund for ${bountyTitle} has been ${text}`
    : `The bounty you were watching ${bountyTitle} ${text}`;
  const subscribedUsers = await prisma.watchBounty.findMany({
    where: {
      bounty: {
        slug: bountySlug,
      },
    },
    select: {
      userId: true,
    },
  });
  subscribedUsers &&
    subscribedUsers.map(async (user) => {
      const notification: PushNotificationLoad = {
        user: user.userId,
        message: message,
        url: GoToBountyPage(bountySlug),
      };
      await SendNotifications(prisma, [notification]);
    });
};
