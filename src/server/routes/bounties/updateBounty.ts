import { BountyState, PrismaClient } from '@prisma/client';

const _updateBounty = async (
  prisma: PrismaClient,
  slug: string,
  status: BountyState
) => {
  const data = await prisma.bounty.update({
    data: {
      status,
    },
    where: {
      slug,
    },
  });
  return data;
};

export const CloseBounty = async (prisma: PrismaClient, bountySlug: string) => {
  await _updateBounty(prisma, bountySlug, BountyState.Closed);
};
