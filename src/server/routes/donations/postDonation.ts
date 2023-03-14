import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

import { ERROR } from '@/server/importer/utils';
import { signedInOnlyProcedure } from '@/server/procedures';

import { ThenArg } from '../utils/helperTypes';

const postDonationSchema = z.object({
  userId: z.string(),
  bountySlug: z.string(),
  txnHash: z.string(),
});

export type PostDonationSchemaParams = z.infer<typeof postDonationSchema>;

async function _postDonation(
  prisma: PrismaClient,
  input: PostDonationSchemaParams
) {
  try {
    const donation = await prisma.donation.create({
      data: {
        txnHash: input.txnHash,
        txnDate: new Date(),
        addedToBounty: false,
        isValid: true,
        bounty: {
          connect: {
            slug: input.bountySlug,
          },
        },
        user: {
          connect: {
            id: input.userId,
          },
        },
      },
    });
    return donation;
  } catch (error) {
    ERROR(`Error adding donation: ${error}`);
  }
}

export const postDonation = signedInOnlyProcedure
  .input(postDonationSchema)
  .mutation(async ({ ctx, input }) => {
    const donation = await _postDonation(ctx.prisma, input);
    return { donation };
  });

/** Array of organizations with Metadata in them */
export type PostDonation = NonNullable<
  ThenArg<ReturnType<typeof _postDonation>>
>;
