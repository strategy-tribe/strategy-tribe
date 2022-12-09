import { PrismaClient } from '@prisma/client';

import { ReadFileInDataFolder } from '../routers/ReadFileInDataFolder';
import { LOG } from './utils';
import { ReadFileInDataFolder } from '../routers/ReadFileInDataFolder';

/** Resets the countries in DB */
export async function AddCountriesToDB(prisma: PrismaClient) {
  const countries = ReadFileInDataFolder(
    process.env.COUNTRIES_FILE as string
  ).data;
  if (!countries) {
    throw new Error('Unable to read countries.json');
  }

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
