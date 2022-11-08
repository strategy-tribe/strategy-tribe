import prisma from '@/server/prisma/prismaClient';

import countries from './data/countries.json';
import { LOG } from './utils';

/** Resets the countries in DB */
export async function AddCountriesToDB() {
  await prisma.$connect();

  const del = await prisma.country.deleteMany();
  LOG(`Deleted ${del.count} countries from DB`);

  const data = countries.map((c) => ({
    code: c.Code,
    name: c.Name,
    organizationsIds: [],
  }));
  const res = await prisma.country.createMany({
    data,
  });

  LOG(`Added ${res.count} countries to DB`);
}
