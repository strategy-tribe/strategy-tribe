import { FullCountriesData } from '@/server/routers/map';

export type MapDataWithFeatures = {
  mapData: FullCountriesData;
  features: any[];
};
