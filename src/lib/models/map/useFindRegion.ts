import { RegionData } from './RegionStats';

export const useFindRegion = (regions: RegionData[]) => {
  function findRegion(countryName: string) {
    if (!countryName) {
      console.error('tried to get an empty cn');
      return undefined;
    }

    return regions.find((r) =>
      r.countries?.includes(countryName.toLocaleLowerCase().trim())
    );
  }

  return { findRegion };
};
