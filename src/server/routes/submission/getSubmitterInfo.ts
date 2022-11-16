import { z } from 'zod';

import { staffOnlyProcedure } from '@/server/procedures';

import { spotsLeftForUser } from '../utils/spotsLeftForUser';

const GetSubmitterInfoSchema = z.object({
  submitterId: z.string(),
  bountySlug: z.string(),
  address: z.string(),
});

export type GetSubmitterInfoParams = z.infer<typeof GetSubmitterInfoSchema>;

export const getSubmitterInfo = staffOnlyProcedure
  .input(GetSubmitterInfoSchema)
  .query(async ({ input, ctx }) => {
    const prisma = ctx.prisma;
    try {
      const totalSubmissions: number = await prisma.submission.count({
        where: {
          authorId: input.submitterId,
        },
      });
      const bountySubmissions: number = await prisma.submission.count({
        where: {
          authorId: input.submitterId,
          bountySlug: input.bountySlug,
        },
      });
      const submissionsAllowed = await spotsLeftForUser(
        input.bountySlug,
        input.address,
        prisma
      );

      return {
        totalSubmissions,
        bountySubmissions,
        submissionsAllowed,
      };
    } catch (error) {
      console.error(error);
    }
  });
