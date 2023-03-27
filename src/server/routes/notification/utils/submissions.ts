import { PrismaClient, SubmissionState } from '@prisma/client';
import { TRPCError } from '@trpc/server';

import { GoToSubmissionPage } from '@/lib/utils/Routes';

import { PushNotificationLoad } from './onesignal';
import { DeleteNotifsAfterReview, SendNotifications } from './utils';

/** Creates a notification load for a submission update.  */
const CreateSubmissionNotificationLoad = ({
  bountyTitle,
  state,
  submissionId,
  isBulkRejection,
  userId,
}: {
  userId: string;
  submissionId: string;
  bountyTitle: string;
  isBulkRejection: boolean;
  state: SubmissionState;
}): PushNotificationLoad => {
  let message = '';
  if (isBulkRejection) {
    message = `Your submission for ${bountyTitle} has been rejected due to another submission`;
  } else {
    switch (state) {
      case 'Accepted':
        message = `Your submission for ${bountyTitle} has been accepted`;
        break;
      case 'Rejected':
        message = `Your submission for ${bountyTitle} has been rejected`;
        break;
      case 'WaitingForReview':
      default:
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message:
            'You can only change a submission state to either Accepted or Rejected',
        });
    }
  }

  return {
    message,
    url: GoToSubmissionPage(submissionId),
    user: userId,
  };
};

/** Notify users that their submission was rejected */
export const NotifyUsers_SubmissionsRejected = async (
  prisma: PrismaClient,
  bountySlug: string,
  isBulkRejection: boolean,
  load: { userId: string; submissionId: string }[]
) => {
  const { title: bountyTitle } = await prisma.bounty.findUniqueOrThrow({
    where: {
      slug: bountySlug,
    },
    select: { title: true },
  });

  const alreadyRejectedMessage = `Your submission for ${bountyTitle} has been rejected`;

  const previouslyRejectedSubmissions: number = await prisma.notification.count(
    {
      where: {
        AND: {
          userId: load[0]?.userId ?? '',
          message: alreadyRejectedMessage,
        },
      },
    }
  );
  const notifications = load.map(({ submissionId, userId }) =>
    CreateSubmissionNotificationLoad({
      userId,
      submissionId,
      bountyTitle,
      isBulkRejection,
      state: SubmissionState.Rejected,
    })
  );
  if (previouslyRejectedSubmissions === 0) {
    await SendNotifications(prisma, notifications);
  }
  await DeleteNotifsAfterReview(prisma, load[0]?.submissionId, bountyTitle);
};

export const NotifyUsers_SubmissionAccepted = async (
  prisma: PrismaClient,
  bountySlug: string,
  load: { userId: string; submissionId: string }
) => {
  const { title: bountyTitle } = await prisma.bounty.findUniqueOrThrow({
    where: {
      slug: bountySlug,
    },
    select: { title: true },
  });

  const notification = CreateSubmissionNotificationLoad({
    userId: load.userId,
    submissionId: load.submissionId,
    bountyTitle,
    isBulkRejection: false,
    state: SubmissionState.Accepted,
  });

  await SendNotifications(prisma, [notification]);
  await DeleteNotifsAfterReview(prisma, load.submissionId, bountyTitle);
};

export const NotifyStaffs_SubmissionCreated = async (
  prisma: PrismaClient,
  bountySlug: string,
  submissionId: string
) => {
  const { title: bountyTitle } = await prisma.bounty.findUniqueOrThrow({
    where: {
      slug: bountySlug,
    },
    select: { title: true },
  });
  const message = `There is a new submission for ${bountyTitle}`;
  const users = await prisma.user.findMany({
    where: {
      OR: [
        {
          rol: 'ADMIN',
        },
        { rol: 'STAFF' },
      ],
    },
    select: {
      id: true,
    },
  });
  users &&
    users.map(async (user) => {
      const notification: PushNotificationLoad = {
        user: user.id,
        message: message,
        url: GoToSubmissionPage(submissionId),
      };
      await SendNotifications(prisma, [notification]);
    });
};
