import type { NextApiRequest, NextApiResponse } from 'next';

import { AddCountriesToDB } from '@/server/importer/countries';
import prisma from '@/server/prisma/prismaClient';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await AddCountriesToDB(prisma);
    res.status(200).json({ msg: 'success, created countries' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ msg: 'error', error });
  }
}
