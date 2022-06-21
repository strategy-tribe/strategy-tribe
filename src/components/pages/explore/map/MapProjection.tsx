import { Graticule } from './Graticule';
import { Countries } from './Countries';
import { geoMercator } from 'd3';
import { geoPath } from 'd3-geo';
import React, { useMemo } from 'react';
import { mapProps } from '@/lib/models/map/mapProps';

const typeOfMap = geoMercator;

export function MapProjection() {
  const { width, color, height } = mapProps;
  const projection = useMemo(() => typeOfMap(), []);
  const path = useMemo(() => geoPath(projection), [projection]);

  return (
    <div className="grid place place-items-center">
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height * 0.7}`}
      >
        <Graticule path={path} />
        <Countries path={path} />
      </svg>
    </div>
  );
}
