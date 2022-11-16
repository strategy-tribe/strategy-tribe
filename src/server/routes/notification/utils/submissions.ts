import { PrismaClient, SubmissionState } from '@prisma/client';
import { TRPCError } from '@trpc/server';

import { GoToSubmissionPage } from '@/lib/utils/Routes';

import { PushNotificationLoad } from './onesignal';
import { SenNotifications } from './utils';

/** Creates a notification load for a submission update.  */
const CreateSubmissionNotificationLoad = ({
  bountyTitle,
  state,
  submissionId,
  userId,
}: {
  userId: string;
  submissionId: string;
  bountyTitle: string;
  state: SubmissionState;
}): PushNotificationLoad => {
  let message = '';
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
  load: { userId: string; submissionId: string }[]
) => {
  const { title: bountyTitle } = await prisma.bounty.findUniqueOrThrow({
    where: {
      slug: bountySlug,
    },
    select: { title: true },
  });

  const notifications = load.map(({ submissionId, userId }) =>
    CreateSubmissionNotificationLoad({
      userId,
      submissionId,
      bountyTitle,
      state: SubmissionState.Rejected,
    })
  );

  await SenNotifications(prisma, notifications);
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
    state: SubmissionState.Accepted,
  });

  await SenNotifications(prisma, [notification]);
};
