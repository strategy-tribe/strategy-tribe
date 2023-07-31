import { Prisma, PrismaClient, SubmissionState } from '@prisma/client';
import { z } from 'zod';

import { NotifyUsers_SubmissionsRejected } from '../notification/utils/submissions';

/** Schema used to update submissions */
const UpdateSubmissionsSchema = z.object({
  state: z.nativeEnum(SubmissionState).optional(),
  // reviewed: z.boolean().optional(),
  ids: z.string().array().optional(),
  exceptIds: z.string().array().optional(),
  /** Slugs of the bounties */
  bounties: z.string().array().optional(),
});

type UpdateSubmissionsParams = z.infer<typeof UpdateSubmissionsSchema>;

/** Schema used to update for submissions */
const UpdateSubmissionsDataSchema = z.object({
  state: z.nativeEnum(SubmissionState),
  uncertain: z.boolean().optional(),
});

export type UpdateSubmissionsDataParams = z.infer<
  typeof UpdateSubmissionsDataSchema
>;

const _updateSubmissions = async (
  config: UpdateSubmissionsParams,
  input: UpdateSubmissionsDataParams,
  prisma: PrismaClient
) => {
  const where = Prisma.validator<Prisma.SubmissionWhereInput>()({
    AND: {
      state: config.state,
      bountySlug: config.bounties ? { in: config.bounties } : undefined,
      id: { in: config.ids, notIn: config.exceptIds },
    },
  });
  const data = await prisma.submission.updateMany({
    data: input,
    where,
  });
  return data;
};

/** Rejects all of the submissions for a bounty except one. Also notifies users that their submissions got rejected */
export const RejectAndNotifySubmissions = async (
  prisma: PrismaClient,
  data: {
    /** It won't reject this address */
    rejectAllButThisOne: string;
    bountySlug: string;
  }
) => {
  await _updateSubmissions(
    {
      state: SubmissionState.WaitingForReview,
      exceptIds: [data.rejectAllButThisOne],
      bounties: [data.bountySlug],
    },
    {
      state: SubmissionState.Rejected,
    },
    prisma
  );

  //#region Mean to be used only here
  type _UserData = {
    id: string;
    authorId: string | null;
  };
  type _CleanUserData = {
    id: string;
    authorId: string;
  };
  //#endregion Mean to be used only here

  const users: _UserData[] = await prisma.submission.findMany({
    where: {
      AND: {
        state: SubmissionState.Rejected,
        bountySlug: data.bountySlug,
      },
    },
    select: {
      id: true,
      authorId: true,
    },
  });

  const isClean = (item: _UserData): item is _CleanUserData => {
    return !!item.authorId;
  };

  await NotifyUsers_SubmissionsRejected(
    prisma,
    data.bountySlug,
    true,
    users.filter(isClean).map((i) => {
      return { userId: i.authorId, submissionId: i.id };
    })
  );
};
