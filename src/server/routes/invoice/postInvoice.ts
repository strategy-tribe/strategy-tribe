import { InvoiceStatus, PrismaClient } from '@prisma/client';
import { z } from 'zod';

/** Schema used to post Invoice */
const PostReviewSchema = z.object({
  status: z.nativeEnum(InvoiceStatus),
  submissionId: z.string(),
  slug: z.string(),
});

export type PostReviewParams = z.infer<typeof PostReviewSchema>;

export const CreateInvoice = async (
  prisma: PrismaClient,
  input: PostReviewParams
) => {
  const { status, submissionId, slug } = input;

  //TODO: Guard here. Check if the bounty, submission, and review are valid before creating an invoice
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
