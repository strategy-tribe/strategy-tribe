import { ResponsiveChoropleth } from '@nivo/geo';
import { CountryStats } from '@prisma/client';
import { useMemo } from 'react';

import useWindowDimensions from '@/lib/hooks/useWindowDimensions';
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

  const dataParsed = useMemo(() => {
    const newLocal = map?.mapData.countries.map((x) => {
      return {
        id: x.country?.code,
        bountyCount: x.bountyCount,
        totalFunds: x.totalFunds,
        organizationCount: x.organizationCount,
      };
    });
    return newLocal ?? [];
  }, [map]);

  if (!map) return <></>;
  return (
    <div className="h-[600px] w-full">
      <ResponsiveChoropleth
        projectionType="naturalEarth1"
        data={dataParsed}
        features={map.features}
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
        colors={['#423B80']}
        domain={[0, max + max * 0.05]}
        unknownColor="#191919"
        value={(data) => {
          if (!data) {
            return 0;
          } else if (data as CountryStats) {
            const value = (data as CountryStats).bountyCount;
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
        borderColor="#CCCCCC"
        onClick={(thing) => {
          const data = thing.label as string;

          if (!data) return;
          addCountry(data);
        }}
        tooltip={({ feature }) => {
          if (!feature?.data) return null;

          const label = feature.label;

          const { bountyCount, organizationCount, totalFunds } =
            feature.data as CountryStats;
          return (
            <div className="elevation-5 space-y-1 rounded bg-surface p-4 text-on-surface-p0">
              <div className="flex items-center justify-between gap-6">
                <span className="label-lg">{label}</span>
                <span className="h5 text-main-light">
                  {kFormatter(totalFunds)} MATIC
                </span>
              </div>
              <div className="label-sm flex items-center justify-between gap-6 text-on-surface-unactive">
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
