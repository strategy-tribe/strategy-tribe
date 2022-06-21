import { ExtendedFeatureCollection, json } from 'd3';
import { useQuery } from 'react-query';
import { feature, mesh } from 'topojson';
import { Topology } from 'topojson-specification';

const mapDataUrl = 'https://unpkg.com/world-atlas@2.0.2/countries-50m.json';

interface CustomTopology extends ExtendedFeatureCollection {
  interiors: any;
}

const getTopology = async () => {
  const topology = await json(mapDataUrl);
  const {
    objects: { countries, land },
  } = topology as any;

  const x = feature(topology as Topology, countries) as any;
  x.interiors = mesh(topology as Topology, land, (a, b) => a !== b);
  return x as CustomTopology;
};

export const useTopology = () => {
  const {
    data: topology,
    isLoading,
    error,
  } = useQuery('get topology', getTopology, {
    cacheTime: Infinity,
    staleTime: Infinity,
  });

  return { topology, isLoading, error };
};
