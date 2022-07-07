import { CountryData } from './CountryData';

export type MapData = {
  id: string;
  createdAt: Date;
  regions: CountryData[];
};
