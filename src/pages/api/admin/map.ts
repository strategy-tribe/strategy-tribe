import type { NextApiRequest, NextApiResponse } from 'next';

import { GenerateCountriesData } from '@/server/importer/generateCountriesData';
import prisma from '@/server/prisma/prismaClient';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await GenerateCountriesData(prisma);
    res.status(200).json({ msg: 'success, generated map data' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ msg: 'error', error });
  }
}
