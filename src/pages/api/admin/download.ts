import type { NextApiRequest, NextApiResponse } from 'next';

import { DownloadData } from '@/server/importer/downloadData';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await DownloadData();
    res
      .status(200)
      .json({ msg: 'success, data downloaded (is not in the db yet!)' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ msg: 'error', error });
  }
}
