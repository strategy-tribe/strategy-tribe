import { BountyState, PrismaClient } from '@prisma/client';
import { z } from 'zod';

import { GetBountyParams } from './getBounty';

/** Schema used to update for bounty */
const UpdateBountyDataSchema = z.object({
  status: z.nativeEnum(BountyState),
});

export type UpdateBountyDataParams = z.infer<typeof UpdateBountyDataSchema>;

export const _updateBounty = async (
  config: GetBountyParams,
  input: UpdateBountyDataParams,
  prisma: PrismaClient
) => {
  const data = await prisma.bounty.update({
    data: input,
    where: config,
  });
  return data;
};
