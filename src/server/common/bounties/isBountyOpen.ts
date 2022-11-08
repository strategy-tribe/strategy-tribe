import prisma from '@/lib/prisma/prismaClient';

/** Returns 'true' if the bounty id belongs to an open bounty */
export const isBountyOpen = async (slug: string): Promise<boolean> => {
  const bounty = await prisma.bounty.findUnique({ where: { slug: slug } });
  if (!bounty) return false;
  return bounty.status === 'Open';
};
