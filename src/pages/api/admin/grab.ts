import type { NextApiRequest, NextApiResponse } from 'next';

import { GenerateCountriesData } from '@/server/importer/generateCountriesData';
import { GrabData } from '@/server/importer/scrapSheet';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await GrabData();
    await GenerateCountriesData();

    res.status(200).json({ msg: 'success, data added to DB' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ msg: 'error', error });
  }
}
