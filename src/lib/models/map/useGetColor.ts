import { scaleSequential, max, interpolate } from 'd3';
import { DARKEST, LIGHTEST } from './mapColors';
import { RegionData } from './RegionStats';

export const useGetColor = (regions: RegionData[]) => {
  const colorScale = scaleSequential(interpolate(DARKEST, LIGHTEST)).domain([
    0,
    max(regions, (reg) => reg.amountOfBounties) || 0,
  ]);

  const getColor = (region: RegionData) => {
    const val = region.amountOfBounties;
    if (val) {
      const res = colorScale(val);
      return res;
    }
  };

  return { getColor };
};
