import { PrismaClient } from '@prisma/client';
import axios from 'axios';

import { LOG } from './utils';

/** Resets the countries in DB */
export async function AddCountriesToDB(prisma: PrismaClient) {
  const url = process.env.COUNTRIES_URL as string;
  if (!url) {
    throw new Error('countries url undefined');
  }
  const countries = await (
    await axios(url, {
      headers: {
        TOKEN: process.env.ADMIN_TOKEN as string,
      },
    })
  ).data;

  const parsed = countries.map((c: { Code: string; Name: string }) => ({
    code: c.Code,
    name: c.Name,
  }));

  const res = await prisma.country.createMany({
    skipDuplicates: true,
    data: parsed,
  });

  LOG(`Added ${res.count} countries to DB`);
}
