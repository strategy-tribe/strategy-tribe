import { LIGHTEST, DARKEST } from '@/lib/models/map/mapColors';
import { useFindRegion } from '@/lib/models/map/useFindRegion';
import { useGetColor } from '@/lib/models/map/useGetColor';
import { GeoPath, GeoPermissibleObjects, selectAll, select } from 'd3';
import { useMemo, useLayoutEffect, useEffect } from 'react';
import { useExploreContext } from '../ExploreContext';
import { Country } from './Country';
import { useTopology } from '@/lib/models/map/useGetTopology';
import { useCountryLabel } from '@/lib/models/map/useCountryLabel';

export function Countries({
  path,
}: {
  path: GeoPath<any, GeoPermissibleObjects>;
}) {
  const { topology } = useTopology();

  const { setSelected, regions } = useExploreContext();

  const { findRegion } = useFindRegion(regions);

  const { getColor } = useGetColor(regions);

  const { createLabel, getNameFromLabel } = useCountryLabel();

  const countries = useMemo(() => {
    const features = topology?.features;
    return features?.map((feature, i) => {
      const { name } = feature.properties as any;
      const countryName = name as string;
      const region = findRegion(countryName);
      const color = region ? getColor(region) : undefined;
      return (
        <Country
          key={i}
          label={createLabel(name, region)}
          path={path(feature) || ''}
          color={color}
        />
      );
    });
  }, [topology]);

  useEffect(() => {
    selectAll('.country')
      .on('mouseover', (e) => {
        const id = e.target.id as string;
        const name = getNameFromLabel(id);
        const region = findRegion(name);
        const selector = `#${id}`;
        setSelected(region);
        select(selector).transition().duration(30).attr('fill', LIGHTEST);
      })
      .on('mouseout', function (e) {
        const id = e.target.id;
        const selector = `#${id}`;
        setSelected(undefined);
        select(selector).transition().duration(30).attr('fill', DARKEST);
      });
  }, [countries]);

  return <>{countries}</>;
}
