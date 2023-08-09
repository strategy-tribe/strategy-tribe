import type { NextApiRequest, NextApiResponse } from 'next';

import { UpdateBalance } from '@/server/dataModifications/updateBalance';
import prisma from '@/server/prisma/prismaClient';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await UpdateBalance(prisma);
    res.status(200).json({ msg: 'success, updated wallet balances' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ msg: 'error', error });
  }
}
