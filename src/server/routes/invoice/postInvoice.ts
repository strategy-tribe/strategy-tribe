import { InvoiceStatus, PrismaClient } from '@prisma/client';
import { z } from 'zod';

/** Schema used to post Invoice */
const PostReviewSchema = z.object({
  status: z.nativeEnum(InvoiceStatus),
  submissionId: z.string(),
  slug: z.string(),
});

export type PostReviewParams = z.infer<typeof PostReviewSchema>;

export const _postInvoice = async (
  input: PostReviewParams,
  prisma: PrismaClient
) => {
  const { status, submissionId, slug } = input;
  const { id } = await prisma.invoice.create({
    data: {
      status,
      submission: {
        connect: {
          id: submissionId,
        },
      },
      bounty: {
        connect: {
          slug,
        },
      },
    },
  });
  return id;
};
