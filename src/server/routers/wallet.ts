import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

import { router, signedInOnlyProcedure } from '../procedures';
import { getBalance } from '../routes/utils/getBalance';

const getBalanceSchema = z.object({
  address: z.string(),
});

export type GetBalanceParams = z.infer<typeof getBalanceSchema>;
export const walletRouter = router({
  getBalance: signedInOnlyProcedure
    .input(getBalanceSchema)
    .query(async ({ ctx, input }) => {
      const balance = await GetBalance(ctx.prisma, input);
      return { balance, ...input };
    }),
});

async function GetBalance(
  prisma: PrismaClient,
  input: GetBalanceParams
): Promise<string> {
  const { address } = input;
  const balance = await getBalance(address);
  return balance;
}
