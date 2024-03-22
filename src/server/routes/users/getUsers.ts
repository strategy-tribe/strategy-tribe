import { Prisma, PrismaClient, Rol, SubmissionState } from '@prisma/client';
import { z } from 'zod';

import { Order } from '@/lib/models/Order';

import { signedInOnlyProcedure } from '@/server/procedures';

import { ArrayElement, ThenArg } from '../utils/helperTypes';

const getUsersSchema = z.object({
  userId: z.string().optional(),
  address: z.string().optional(),
  role: z.nativeEnum(Rol).optional(),
  paginate: z.boolean().optional(),
  amount: z.number().optional(),
  page: z.number().optional(),
  order: z.nativeEnum(Order).default(Order.Desc).optional(),
});

export type GetUsersSchemaParams = z.infer<typeof getUsersSchema>;

async function _getUsers(
  input: GetUsersSchemaParams,
  where: Prisma.UserWhereInput,
  prisma: PrismaClient
) {
  const users = await prisma.user.findMany({
    where,
    skip: (input?.amount ?? 0) * (input?.page ?? 0),
    take: input.amount,
    select: {
      id: true,
      address: true,
      rol: true,
      username: true,
      submissions: {
        select: {
          state: true,
        },
      },
    },
    orderBy: {
      createdAt: input.order,
    },
  });

  return users.map((u) => ({
    ...u,
    submissions: u.submissions.length,
    acceptedSubmissions: u.submissions.filter(
      (sub) => sub.state === SubmissionState.Accepted
    ).length,
  }));
}

const countUsers = async (
  where: Prisma.UserWhereInput,
  prisma: PrismaClient
) => {
  const count: number = await prisma.user.count({
    where: where,
  });

  return count;
};

const getWhere = (input: GetUsersSchemaParams): Prisma.UserWhereInput => {
  return {
    id: input.userId,
    address: input.address,
    rol: input.role,
  };
};

export const getUsers = signedInOnlyProcedure
  .input(getUsersSchema)
  .query(async ({ ctx, input }) => {
    const where = getWhere(input);
    const users = await _getUsers(input, where, ctx.prisma);
    const count = await countUsers(where, ctx.prisma);
    return { users, count };
  });

/** Array of Users with Metadata in them */
export type FullUsers = NonNullable<ThenArg<ReturnType<typeof _getUsers>>>;

export type FullUser = ArrayElement<FullUsers>;
