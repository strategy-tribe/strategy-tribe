import { ThenArg } from '@trpc/server';
import { v4 as uuidv4 } from 'uuid';

import { signedInOnlyProcedure } from '@/server/procedures';

export type User = NonNullable<ThenArg<ReturnType<typeof getUser>>>;

export const getUser = signedInOnlyProcedure.query(
  async ({ ctx: { prisma, session } }) => {
    let user = await prisma.user.findUnique({
      where: {
        address: session.user.address,
      },
      select: {
        username: true,
        referralCode: true,
      },
    });
    if (!user?.referralCode) {
      user = await prisma.user.update({
        where: {
          address: session.user.address,
        },
        data: {
          referralCode: uuidv4(),
        },
        select: {
          username: true,
          referralCode: true,
        },
      });
    }
    return { user };
  }
);
