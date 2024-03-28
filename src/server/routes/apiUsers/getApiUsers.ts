import { Prisma, PrismaClient } from '@prisma/client';
import { z } from 'zod';

import { Order } from '@/lib/models/Order';

import { staffOnlyProcedure } from '@/server/procedures';

import { ArrayElement, ThenArg } from '../utils/helperTypes';

/** Schema used to query for apiUsers */
const GetApiUsersSchema = z.object({
  order: z.nativeEnum(Order).default(Order.Desc).optional(),
  paginate: z.boolean().optional(),
  amount: z.number().optional(),
  page: z.number().optional(),
  isActive: z.boolean().optional(),
  name: z.string().optional(),
  token: z.string().optional(),
  tags: z.string().array().optional(),
});

export type GetApiUsersParams = z.infer<typeof GetApiUsersSchema>;

/** Defines how to query the database to obtain `SmallApiUser`
 *
 * Exporting this so other queries can also fulfil having a `SmallBounty` in their "includes"
 *
 */
export const API_USERS_SELECT = Prisma.validator<Prisma.ApiUserSelect>()({
  id: true,
  name: true,
  token: true,
  apiUseCount: true,
  isActive: true,
  updatedAt: true,
  tags: {
    select: {
      name: true,
    },
  },
});

export const _getApiUsers = async (
  input: GetApiUsersParams,
  prisma: PrismaClient
) => {
  const where = getWhere(input);
  const apiUsers = await prisma.apiUser.findMany({
    where: where,
    skip: (input?.amount ?? 0) * (input?.page ?? 0),
    take: input.amount,
    orderBy: {
      createdAt: input.order,
    },
    select: API_USERS_SELECT,
  });

  return apiUsers;
};

const getWhere = (input: GetApiUsersParams) => {
  const where = Prisma.validator<Prisma.ApiUserWhereInput>()({
    AND: {
      isActive: input.isActive,
      tags: input.tags
        ? {
            some: {
              name: {
                in: input.tags,
              },
            },
          }
        : undefined,
      name: {
        search: input.name?.split(' ').join(' & '),
      },
      token: input.token,
    },
  });
  return where;
};

const countApiUsers = async (
  input: GetApiUsersParams,
  prisma: PrismaClient
) => {
  const where = getWhere(input);

  const count: number = await prisma.apiUser.count({
    where: where,
  });

  return count;
};

export const getApiUsers = staffOnlyProcedure
  .input(GetApiUsersSchema)
  .query(async ({ input, ctx }) => {
    const apiUsers: ApiUsersWithMetadata = await _getApiUsers(
      input,
      ctx.prisma
    );

    const count = await countApiUsers(input, ctx.prisma);

    return { apiUsers, count };
  });

type ApiUsersWithMetadata = ThenArg<ReturnType<typeof _getApiUsers>>;

export type SmallApiUser = ArrayElement<ApiUsersWithMetadata>;
