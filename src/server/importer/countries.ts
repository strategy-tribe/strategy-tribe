import { PrismaClient } from '@prisma/client';

import countries from './data/countries.json';
import { LOG } from './utils';

/** Resets the countries in DB */
export async function AddCountriesToDB(prisma: PrismaClient) {
  const parsed = countries.map((c) => ({
    code: c.Code,
    name: c.Name,
  }));

  const res = await prisma.country.createMany({
    skipDuplicates: true,
    data: parsed,
  });

  LOG(`Added ${res.count} countries to DB`);
}
