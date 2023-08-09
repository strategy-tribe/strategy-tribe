import { ThenArg } from '@trpc/server';
import { z } from 'zod';

import { signedInOnlyProcedure } from '@/server/procedures';

const UpdateUsernameSchema = z.object({
  username: z.string(),
});

/** Params necessary to call `postBounties`  */
export type UpdateUsernameParams = z.infer<typeof UpdateUsernameSchema>;

/** Response to adding Bounties */
export type UpdateUsernameResponse = NonNullable<
  ThenArg<ReturnType<typeof updateUsername>>
>;

export const updateUsername = signedInOnlyProcedure
  .input(UpdateUsernameSchema)
  .mutation(async ({ input, ctx: { prisma, session } }) => {
    await prisma.user.update({
      where: {
        address: session.user.address,
      },
      data: {
        username: input.username,
      },
    });
  });
