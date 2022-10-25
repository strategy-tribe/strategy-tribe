import { Country } from '@prisma/client';

export type CountriesData = {
  id: string;
  createdAt: Date;
  countries: CountryMapData[];
};

export type CountryMapData = Country & {
  bountyCount: number;
  organizationCount: number;
  totalFunds: number;
};
