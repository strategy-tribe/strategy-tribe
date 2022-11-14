import type { NextApiRequest, NextApiResponse } from 'next';

import { AddCountriesToDB } from '@/server/importer/countries';
import { DownloadData } from '@/server/importer/downloadData';
import { GenerateCountriesData } from '@/server/importer/generateCountriesData';
import { ResetDB } from '@/server/importer/resetDb';
import { GrabData } from '@/server/importer/scrapSheet';
import { UpdateBalance } from '@/server/importer/updateBalance';
import prisma from '@/server/prisma/prismaClient';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await ResetDB(prisma);
    await DownloadData();
    await AddCountriesToDB(prisma);
    await GrabData(prisma);
    await UpdateBalance(prisma);
    await GenerateCountriesData(prisma);

    res.status(200).json({ msg: 'success, db set up' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ msg: 'error', error });
  }
}
