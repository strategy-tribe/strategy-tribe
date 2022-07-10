import { CountryData } from './CountryData';

export type CountriesData = {
  id: string;
  createdAt: Date;
  countries: CountryData[];
};
