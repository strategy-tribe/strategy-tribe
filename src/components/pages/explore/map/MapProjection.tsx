import { ExtendedFeatureCollection, geoMercator, json } from 'd3';
import { feature, mesh } from 'topojson';
import { useMemo } from 'react';
import { Topology } from 'topojson-specification';
import { geoPath, geoGraticule } from 'd3-geo';
import { useQuery } from 'react-query';
import { Country } from './Country';

const mapDataUrl = 'https://unpkg.com/world-atlas@2.0.2/countries-50m.json';

interface CustomTopology extends ExtendedFeatureCollection {
  interiors: any;
}

const scale = 1;
const width = 1000 * scale;
const height = 500 * scale;
const color = ' fill-dark';

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
export function MapProjection() {
  const { data: topology } = useQuery('get topology', getTopology, {
    cacheTime: Infinity,
    staleTime: Infinity,
  });

  const projection = useMemo(() => typeOfMap(), []);
  const path = useMemo(() => geoPath(projection), [projection]);
  const graticule = useMemo(() => geoGraticule(), []);
  const features = useMemo(() => topology?.features, [topology?.features]);

  const countries = useMemo(() => {
    return features?.map((feature, i) => {
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
