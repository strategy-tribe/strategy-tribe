import type { NextApiRequest, NextApiResponse } from 'next';

import { GoToBountiesPage } from '@/lib/utils/Routes';

import { GenerateCountriesData } from '@/server/importer/generateCountriesData';
import { GrabData } from '@/server/importer/scrapSheet';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await GrabData();
    await GenerateCountriesData();
    await res.revalidate(GoToBountiesPage());

    res.status(200).json({
      msg: 'DB updated, map regenerated, and bounties page revalidated',
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ msg: 'error', error });
  }
}
