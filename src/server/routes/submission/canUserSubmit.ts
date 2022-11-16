import { z } from 'zod';

import { signedInOnlyProcedure } from '@/server/procedures';

import { spotsLeftForUser } from '../utils/spotsLeftForUser';

const CanUserSubmitSchema = z.object({
  bountySlug: z.string(),
});

export type CanUserSubmitSchemaParams = z.infer<typeof CanUserSubmitSchema>;

export const canUserSubmit = signedInOnlyProcedure
  .input(CanUserSubmitSchema)
  .query(async ({ input, ctx }) => {
    const left = await spotsLeftForUser(
      input.bountySlug,
      ctx.session.user.address,
      ctx.prisma
    );

    return {
      canSubmit: left > 0,
      spacesLeft: left,
    };
  });
