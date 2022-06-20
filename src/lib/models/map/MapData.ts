import { RegionStats } from './RegionStats';

export type MapData = {
  id: string;
  createdAt: Date;
  regions: RegionStats[];
};
