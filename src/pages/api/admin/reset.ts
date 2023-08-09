import type { NextApiRequest, NextApiResponse } from 'next';

import { ResetDB } from '@/server/importer/resetDb';
import prisma from '@/server/prisma/prismaClient';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await ResetDB(prisma);
    res.status(200).json({ msg: 'success, DB reset' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ msg: 'error', error });
  }
}
