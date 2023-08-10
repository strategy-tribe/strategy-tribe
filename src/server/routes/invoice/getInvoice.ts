import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

import { adminOnlyProcedure } from '@/server/procedures';

import { SMALL_BOUNTY_SELECTION } from '../bounties/getBounties';
import { ThenArg } from '../utils/helperTypes';

const getInvoiceSchema = z.object({
  id: z.string(),
});

export type GetInvoiceSchemaParams = z.infer<typeof getInvoiceSchema>;

async function _getInvoice(
  prisma: PrismaClient,
  input: GetInvoiceSchemaParams
) {
  const res = await prisma.invoice.findUnique({
    where: {
      id: input.id,
    },
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

export const getInvoice = adminOnlyProcedure
  .input(getInvoiceSchema)
  .query(async ({ ctx, input }) => {
    const invoice = await _getInvoice(ctx.prisma, input);
    return { invoice };
  });

/** Array of organizations with Metadata in them */
export type FullInvoice = NonNullable<ThenArg<ReturnType<typeof _getInvoice>>>;
