import { RegionData } from './RegionStats';

export type MapData = {
  id: string;
  createdAt: Date;
  regions: RegionData[];
};
