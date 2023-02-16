import { ThenArg } from '@trpc/server';

import { signedInOnlyProcedure } from '@/server/procedures';

export type User = NonNullable<ThenArg<ReturnType<typeof getUser>>>;

export const getUser = signedInOnlyProcedure.query(
  async ({ ctx: { prisma, session } }) => {
    const user = await prisma.user.findUnique({
      where: {
        address: session.user.address,
      },
      select: {
        username: true,
      },
    });
    return { user };
  }
);
