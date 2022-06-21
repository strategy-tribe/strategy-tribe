import { geoGraticule, GeoPath, GeoPermissibleObjects } from 'd3';
import { useMemo } from 'react';

export function Graticule({
  path,
}: {
  path: GeoPath<any, GeoPermissibleObjects>;
}) {
  const graticule = useMemo(() => geoGraticule(), []);

  return (
    <path
      d={path(graticule()) || ''}
      className="fill-black stroke-[0.1px] stroke-disabled"
    />
  );
}
