import { Rol } from '@prisma/client';
import { ThenArg } from '@trpc/server';
import { z } from 'zod';

import { adminOnlyProcedure } from '@/server/procedures';

const UpdateUserRoleSchema = z.object({
  address: z.string(),
  role: z.nativeEnum(Rol),
});

/** Params necessary to call `updateUserRole`  */
export type UpdateUserRoleParams = z.infer<typeof UpdateUserRoleSchema>;

/** Response to updateUserRole */
export type UpdateUserRoleResponse = NonNullable<
  ThenArg<ReturnType<typeof updateUserRole>>
>;

export const updateUserRole = adminOnlyProcedure
  .input(UpdateUserRoleSchema)
  .mutation(async ({ input, ctx: { prisma } }) => {
    const user = await prisma.user.update({
      where: {
        address: input.address,
      },
      data: {
        rol: input.role,
      },
    });
    return user;
  });
