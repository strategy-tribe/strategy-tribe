import { Moralis as MoralisType } from 'moralis/types';
import regions from '../../../data/regions.json';
import { MapData } from './MapData';

const getMapStats = async (moralis: MoralisType) => {
  const r = await moralis.Cloud.run('getMapStats');

  const mapData: MapData = {
    id: r.id,
    createdAt: r.attributes.createdAt,
    regions: r.attributes.stats,
  };
  return mapData;
};

const getMapRegions = () => {
  return regions as {
    location: string;
    countries: string[];
  }[];
};

const getCountriesOfRegion = (region: string) => {
  if (!region) return undefined;
  const data = getMapRegions();
  const regionData = data.find(
    (regionData) =>
      regionData.location.toLocaleLowerCase().trim() ===
      region.toLocaleLowerCase().trim()
  );
  const countries = regionData?.countries;
  return countries;
};

export const getMapData = async (moralis: MoralisType): Promise<MapData> => {
  const mapData = await getMapStats(moralis);
  mapData.regions.forEach((reg) => {
    reg.countries = getCountriesOfRegion(reg.name) || [];
  });
  return mapData;
};
