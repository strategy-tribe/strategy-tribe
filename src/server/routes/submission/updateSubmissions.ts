import { Prisma, PrismaClient, SubmissionState } from '@prisma/client';
import { z } from 'zod';

/** Schema used to update submissions */
const UpdateSubmissionsSchema = z.object({
  state: z.nativeEnum(SubmissionState).optional(),
  // reviewed: z.boolean().optional(),
  ids: z.string().array().optional(),
  exceptIds: z.string().array().optional(),
  /** Slugs of the bounties */
  bounties: z.string().array().optional(),
});

export type UpdateSubmissionsParams = z.infer<typeof UpdateSubmissionsSchema>;

/** Schema used to update for submissions */
const UpdateSubmissionsDataSchema = z.object({
  state: z.nativeEnum(SubmissionState),
});

export type UpdateSubmissionsDataParams = z.infer<
  typeof UpdateSubmissionsDataSchema
>;

export const _updateSubmissions = async (
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
