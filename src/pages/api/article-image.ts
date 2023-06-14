import type { NextApiRequest, NextApiResponse } from 'next';

import { getArticleImage } from '@/server/articleImage';
import prisma from '@/server/prisma/prismaClient';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const image = await getArticleImage(prisma, req.query.id as string);
    res.status(200).send(image?.Body);
  } catch (error) {
    console.error(error);
    res.status(400).json({ msg: 'error', error });
  }
}
