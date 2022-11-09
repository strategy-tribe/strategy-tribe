import { PrismaClient } from '@prisma/client';

import prisma from '@/server/prisma/prismaClient';

/** Uses the external id param to find a user */
async function FindUserWithExternalId(
  prisma: PrismaClient,
  externalId: string
) {
  const user = await prisma.user.findUnique({
    where: {
      externalId,
    },
  });

  return user;
}

/** Records a user in the database */
export async function LogUser({
  address,
  externalId,
  signature,
}: {
  address: string;
  externalId: string;
  signature: string;
}) {
  try {
    await prisma.$connect();
    let user = await FindUserWithExternalId(prisma, externalId);

    if (user) {
      return user;
    }

    user = await prisma.user.create({
      data: {
        externalId: externalId,
        rol: 'REGULAR',
        address,
        signature,
      },
    });

    return user;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}
