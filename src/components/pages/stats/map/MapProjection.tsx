import { ResponsiveChoropleth } from '@nivo/geo';
import { useMemo } from 'react';

import useWindowDimensions from '@/lib/hooks/useWindowDimensions';
import { MapDataWithFeatures } from '@/lib/models/MapData';

export default function MapProjection({
  map,
}: {
  map: MapDataWithFeatures | undefined;
}) {
  const max =
    map?.mapData.countries.reduce((acc, curr) => {
      return acc.bountyCount > curr.bountyCount ? acc : curr;
    }).bountyCount ?? 0;

  const { width } = useWindowDimensions();

  const mapSize = useMemo(() => {
    return width < 650 ? 50 : 100;
  }, [width]);

  const dataParsed = useMemo(() => {
    const newLocal = map?.mapData.countries.map((data) => {
      return {
        id: data.country?.code,
        value: data.submissionCount,
      };
    });
    return newLocal ?? [];
  }, [map]);

  if (!map) return <></>;
  return (
    <div className="h-[200px] w-full tablet:h-[400px]">
      <ResponsiveChoropleth
        data={dataParsed}
        features={map.features}
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
        colors="purples"
        domain={[0, 20]}
        unknownColor="#666666"
        label="properties.name"
        valueFormat=".1s"
        projectionTranslation={[0.5, 0.5]}
        projectionRotation={[0, 0, 0]}
        graticuleLineColor="#dddddd"
        borderWidth={0.5}
        projectionScale={mapSize}
        borderColor="#152538"
      />
    </div>
  );
}
