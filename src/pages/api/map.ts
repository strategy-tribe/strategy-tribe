import type { NextApiRequest, NextApiResponse } from 'next';

import { GoToBountiesPage } from '@/lib/utils/Routes';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const secret = process.env.REVALIDATE_SECRET;

  if (req.query.secret !== secret) {
    console.error('Error, invalid key');
    return res.status(400).json({ error: 'Invalid key' });
  }

  try {
    await res.revalidate(GoToBountiesPage());
    return res.status(200).json({ message: 'Client: Revalidating map' });
  } catch (error) {
    console.error(
      `Error regenerating bounties page:\n${JSON.stringify(error, null, 2)}`
    );
    return res.status(500).json({ error });
  }
}
