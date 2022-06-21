import { RegionData } from './RegionStats';

export const useCountryLabel = () => {
  function createLabel(countryName: string, region?: RegionData) {
    return `${countryName}---belongs in ${region?.name}`;
  }

  function getNameFromLabel(label: string) {
    const name = label.slice(0, label.indexOf('---'));
    return name;
  }

  return { createLabel, getNameFromLabel };
};
