import { z } from 'zod';

import { staffOnlyProcedure } from '@/server/procedures';

const GetSubmitterInfoSchema = z.object({
  submitterId: z.string(),
  bountySlug: z.string(),
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

      return {
        totalSubmissions,
        bountySubmissions,
      };
    } catch (error) {
      console.error(error);
    }
  });
