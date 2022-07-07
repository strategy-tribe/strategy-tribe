import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';

export default (req: NextApiRequest, res: NextApiResponse) => {
  const raw = fs.readFileSync('./public/data/countries.json', {
    encoding: 'utf-8',
  });
  const countries = JSON.parse(raw);

  const featuresRaw = fs.readFileSync('./public/data/features.json', {
    encoding: 'utf-8',
  });
  const features = JSON.parse(featuresRaw).features;

  res.status(200).json({ countries, features });
};
