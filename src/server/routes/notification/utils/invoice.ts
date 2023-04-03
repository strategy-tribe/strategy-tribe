import { PrismaClient } from '@prisma/client';

import { GoToSubmissionPage } from '@/lib/utils/Routes';

import { SendNotifications } from './utils';

export const NotifyUsers_InvoicePaid = async (
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
  const message = `Your invoice for ${bountyTitle} has been paid`;
  const notification = {
    message,
    url: GoToSubmissionPage(load.submissionId),
    user: load.userId,
  };
  await SendNotifications(prisma, [notification]);
};
