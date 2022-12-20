import { InvoiceStatus, Prisma, PrismaClient } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { User } from 'next-auth';
import { z } from 'zod';

import { Order } from '@/lib/models/Order';

import { signedInOnlyProcedure } from '@/server/procedures';

import { SMALL_BOUNTY_SELECTION } from '../bounties/getBounties';
import { ThenArg } from '../utils/helperTypes';

const getInvoicesSchema = z.object({
  userIds: z.string().array().optional(),
  statuses: z.nativeEnum(InvoiceStatus).array().optional(),
  paginate: z.boolean().optional(),
  amount: z.number().optional(),
  page: z.number().optional(),
});

export type GetInvoicesSchemaParams = z.infer<typeof getInvoicesSchema>;

function isRequestForInvoicesValid(
  input: GetInvoicesSchemaParams,
  user: User
): boolean {
  const isAdminOrStaff = ['ADMIN', 'STAFF'].includes(user.rol);

  /** Checks if an array of ids contains more than just the id passed */
  function askingForSomeoneElses(ids: string[], user: string) {
    if (ids.length === 0) return false;
    const otherUsers = ids?.filter((otherUser) => otherUser !== user);
    return otherUsers.length > 0;
  }

  const isAskingForSomeoneElses = askingForSomeoneElses(
    input.userIds ?? [],
    user.externalId
  );

  if (!isAdminOrStaff && isAskingForSomeoneElses) return false;

  return true;
}

async function _getInvoices(
  input: GetInvoicesSchemaParams,
  user: User,
  prisma: PrismaClient
) {
  if (!isRequestForInvoicesValid(input, user)) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }

  const owners: string[] | undefined =
    user.rol === 'REGULAR' ? [user.id] : input.userIds;
  const where = Prisma.validator<Prisma.InvoiceWhereInput>()({
    AND: {
      status: input.statuses
        ? {
            in: input.statuses,
          }
        : undefined,
      submission: owners
        ? {
            authorId: {
              in: owners,
            },
          }
        : undefined,
    },
  });
  const res = await prisma.invoice.findMany({
    where,
    skip: (input?.amount ?? 0) * (input?.page ?? 0),
    take: input.amount,
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
    orderBy: {
      createdAt: Order.Asc,
    },
  });

  return res;
}

const countInvoices = async (
  input: GetInvoicesSchemaParams,
  user: User,
  prisma: PrismaClient
) => {
  if (!isRequestForInvoicesValid(input, user)) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }

  const owners: string[] | undefined =
    user.rol === 'REGULAR' ? [user.id] : input.userIds;

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

  const count: number = await prisma.invoice.count({
    where: where,
  });

  return count;
};

export const getInvoices = signedInOnlyProcedure
  .input(getInvoicesSchema)
  .query(async ({ ctx, input }) => {
    const invoices = await _getInvoices(input, ctx.session.user, ctx.prisma);
    const count = await countInvoices(input, ctx.session.user, ctx.prisma);
    return { invoices, count };
  });

/** Array of Invoices with Metadata in them */
export type FullInvoice = NonNullable<ThenArg<ReturnType<typeof _getInvoices>>>;
