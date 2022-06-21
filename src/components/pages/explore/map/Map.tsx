import { MapLegend } from './MapLegend';
import { MapProjection } from './MapProjection';
import { useExploreContext } from '../ExploreContext';
import { Title } from '@/components/utils/Title';

export function Map() {
  const { mapData } = useExploreContext();
  return (
    <div className="space-y-4">
      <Title title="World wide bounties" />

      <MapProjection regions={mapData.regions} />

      <MapLegend regions={mapData.regions} />
    </div>
  );
}
