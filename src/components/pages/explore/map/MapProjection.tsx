import React from 'react';
import { ChoroplethBoundFeature, ResponsiveChoropleth } from '@nivo/geo';

import { useQuery } from 'react-query';
import { CountryData } from '@/lib/models/map/CountryData';
import { useGetMapData } from '@/lib/models/map/useGetMapData';
import { kFormatter } from '@/lib/utils/NumberHelpers';

export default function MapProjection() {
  const { data, isLoading, error } = useGetMapData();
  if (!data || isLoading) return <span>loading...</span>;

  if (error) return <span>{`${error}`}</span>;
  else
    return (
      <div className="w-full h-[500px]">
        <ResponsiveChoropleth
          projectionType="naturalEarth1"
          data={data.countries}
          features={data.features}
          margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
          colors={['#A59DE9', '#948BDE', '#8176D8', '#6C5CE7']}
          domain={[0, 1000000]}
          unknownColor="#191919"
          value={(data) => {
            if (!data) return 0;
            else return (data as CountryData).bounties;
          }}
          label="properties.name"
          valueFormat=".2s"
          //TODO: Make scale a funciton of window size
          projectionScale={180}
          projectionTranslation={[0.5, 0.5]}
          projectionRotation={[0, 0, 0]}
          graticuleLineColor="#dddddd"
          borderWidth={0.2}
          borderColor="#5C5C5C"
          tooltip={({ feature }) => {
            if (!feature?.data) return null;

            const label = feature.label;
            const { bounties, organizations, totalFunds } =
              feature.data as CountryData;
            return (
              <div className="elevation-5 bg-dark text-white p-4 rounded space-y-1">
                <div className="flex justify-between items-center gap-6">
                  <span className="label-lg">{label}</span>
                  <span className="text-purpleDark">{totalFunds} ETH</span>
                </div>
                <div className="flex justify-between items-center gap-6 label-sm text-unactive">
                  <span>{kFormatter(bounties)} bounties</span>
                  <span>{kFormatter(organizations)} organizations</span>
                </div>
              </div>
            );
          }}
        />
      </div>
    );
}
