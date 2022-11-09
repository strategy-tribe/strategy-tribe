import type { NextApiRequest, NextApiResponse } from 'next';

import { UpdateBalance } from '@/server/importer/updateBalance';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await UpdateBalance();
    res.status(200).json({ msg: 'success, updated wallet balances' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ msg: 'error', error });
  }
}
