import { InvoiceStatus, Prisma, PrismaClient } from '@prisma/client';
import { z } from 'zod';

import { adminOnlyProcedure } from '@/server/procedures';

import { SMALL_BOUNTY_SELECTION } from '../bounties/getBounties';
import { ThenArg } from '../utils/helperTypes';

const getInvoicesSchema = z.object({
  userIds: z.string().array().optional(),
  statuses: z.nativeEnum(InvoiceStatus).array().optional(),
});

export type GetInvoicesSchemaParams = z.infer<typeof getInvoicesSchema>;

async function _getInvoices(
  prisma: PrismaClient,
  input: GetInvoicesSchemaParams
) {
  const where = Prisma.validator<Prisma.InvoiceWhereInput>()({
    AND: {
      status: input.statuses
        ? {
            in: input.statuses,
          }
        : undefined,
      submission: input.userIds
        ? {
            authorId: {
              in: input.userIds,
            },
          }
        : undefined,
    },
  });
  const res = await prisma.invoice.findMany({
    where,
    select: {
      bounty: {
        select: SMALL_BOUNTY_SELECTION,
      },
      status: true,
      submission: {
        select: {
          id: true,
          author: true,
          answers: true,
          _count: true,
          review: true,
          state: true,
        },
      },
    },
  });

  return res;
}

export const getInvoices = adminOnlyProcedure
  .input(getInvoicesSchema)
  .query(async ({ ctx, input }) => {
    const invoices = await _getInvoices(ctx.prisma, input);
    return { invoices };
  });

/** Array of Invoices with Metadata in them */
export type FullInvoice = NonNullable<ThenArg<ReturnType<typeof _getInvoices>>>;
