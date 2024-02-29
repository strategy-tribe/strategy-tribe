import { RequirementType } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

import { SubmissionData } from '@/server/dataFetch/submissionData';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const token = req.headers.token as string;
    if (!token) {
      throw new Error('No Token');
    }
    const subs = await SubmissionData(token, req.query.type as RequirementType);
    res.status(200).json(subs);
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ msg: error.toString() });
  }
}
