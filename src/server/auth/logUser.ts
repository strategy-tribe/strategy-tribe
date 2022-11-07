import prisma from '@/lib/prisma/prismaClient';

/** Records a user in the database */
export async function LogUser({
  address,
  profileId,
  signature,
}: {
  address: string;
  profileId: string;
  signature: string;
}) {
  try {
    //why tf...
    await prisma.$connect();
    let user = await prisma.user.findUnique({
      where: {
        moralisId: profileId,
      },
    });

    if (user) {
      return user;
    }

    user = await prisma.user.create({
      data: {
        moralisId: profileId,
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
