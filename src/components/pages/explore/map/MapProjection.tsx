import { ResponsiveChoropleth } from '@nivo/geo';
import { useMemo } from 'react';

import useWindowDimensions from '@/lib/hooks/useWindowDimensions';
import { CountryMapData } from '@/lib/models/CountriesData';
import { kFormatter } from '@/lib/utils/NumberHelpers';

import { useExploreContext } from '../ExploreContext';

export default function MapProjection() {
  const { addCountry, map } = useExploreContext();

  const max =
    map?.mapData.countries.reduce((acc, curr) => {
      return acc.bountyCount > curr.bountyCount ? acc : curr;
    }).bountyCount ?? 0;

  const { width } = useWindowDimensions();

  const mapSize = useMemo(() => {
    const factor = 180 / 1512;
    const value = factor * width;
    return value;
  }, [width]);

  return (
    <div className="w-full h-[500px]">
      <ResponsiveChoropleth
        projectionType="naturalEarth1"
        data={map?.mapData.countries ?? []}
        features={map?.features ?? []}
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
        colors={['#2E2A4D', '#423B80', '#574BB3', '#6C5CE7']}
        domain={[0, max + max * 0.05]}
        unknownColor="#191919"
        value={(data) => {
          if (!data) {
            return 0;
          } else if (data as CountryMapData) {
            const value = (data as CountryMapData).bountyCount;
            return value;
          } else {
            return 0;
          }
        }}
        label="properties.name"
        valueFormat=".2s"
        //TODO: Make scale a funciton of window size
        projectionScale={mapSize}
        projectionTranslation={[0.5, 0.5]}
        projectionRotation={[0, 0, 0]}
        graticuleLineColor="#dddddd"
        borderWidth={0.2}
        borderColor="#5C5C5C"
        onClick={(thing) => {
          const data = thing.data as CountryMapData;
          if (!data || !(data.id as string)) return;
          addCountry(data.id);
        }}
        tooltip={({ feature }) => {
          if (!feature?.data) return null;

          const label = feature.label;
          const { bountyCount, organizationCount, totalFunds } =
            feature.data as CountryMapData;
          return (
            <div className="elevation-5 bg-surface text-on-surface-p0 p-4 rounded space-y-1">
              <div className="flex justify-between items-center gap-6">
                <span className="label-lg">{label}</span>
                <span className="text-main-light h5">
                  {kFormatter(totalFunds)} MATIC
                </span>
              </div>
              <div className="flex justify-between items-center gap-6 label-sm text-on-surface-unactive">
                <span>{kFormatter(bountyCount)} bounties</span>
                <span>{kFormatter(organizationCount)} organizations</span>
              </div>
            </div>
          );
        }}
      />
    </div>
  );
}
