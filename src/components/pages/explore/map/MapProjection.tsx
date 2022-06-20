import { ExtendedFeatureCollection, geoMercator, json } from 'd3';
import { feature, mesh } from 'topojson';
import { useMemo } from 'react';
import { Topology } from 'topojson-specification';
import { geoPath, geoGraticule } from 'd3-geo';
import { useQuery } from 'react-query';
import { Country } from './Country';
import { RegionData } from '@/lib/models/map/RegionStats';
import { useGetColor } from '@/lib/models/map/useGetColor';
import { mapProps } from '@/lib/models/map/mapProps';

const mapDataUrl = 'https://unpkg.com/world-atlas@2.0.2/countries-50m.json';

interface CustomTopology extends ExtendedFeatureCollection {
  interiors: any;
}

const getTopology = async () => {
  const topology = await json(mapDataUrl);
  const {
    objects: { countries },
  } = topology as any;

  const x = feature(topology as Topology, countries) as any;
  x.interiors = mesh(topology as Topology, countries, (a, b) => a !== b);
  return x as CustomTopology;
};

const typeOfMap = geoMercator;

export function MapProjection({ regions }: { regions: RegionData[] }) {
  const { width, color, height } = mapProps;
  const { data: topology } = useQuery('get topology', getTopology, {
    cacheTime: Infinity,
    staleTime: Infinity,
  });

  const projection = useMemo(() => typeOfMap(), []);
  const path = useMemo(() => geoPath(projection), [projection]);
  const graticule = useMemo(() => geoGraticule(), []);
  const features = useMemo(() => topology?.features, [topology?.features]);

  const { getColor } = useGetColor(regions);

  const countries = useMemo(() => {
    return features?.map((feature, i) => {
      const { name } = feature.properties as any;
      const countryName = name as string;

      const region = regions.find((r) => {
        return countryName
          ? r.countries?.find(
              (c) =>
                c.toLocaleLowerCase().trim() ===
                countryName.toLocaleLowerCase().trim()
            )
          : false;
      });

      const color = region ? getColor(region) : undefined;
      return <Country key={i} path={path(feature) || ''} color={color} />;
    });
  }, [features]);

  return (
    <div className="grid place place-items-center">
      <svg width={width} height={height} viewBox="0 0 960 400">
        <g>
          <path
            d={
              path({
                type: 'Sphere',
              }) || ''
            }
            className="fill-black"
          />

          <path
            d={path(graticule()) || ''}
            className="fill-black stroke-[0.1px] stroke-disabled"
          />

          {countries}

          <path
            d={path(topology?.interiors) || ''}
            className={`stroke-black ${color} stroke-[0.5px]`}
          />
        </g>
      </svg>
    </div>
  );
}
