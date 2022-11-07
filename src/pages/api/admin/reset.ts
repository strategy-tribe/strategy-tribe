import type { NextApiRequest, NextApiResponse } from 'next';
import { ResetDB } from 'server/importer/resetDb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await ResetDB();
    res.status(200).json({ msg: 'success, DB reset' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ msg: 'error', error });
  }
}
