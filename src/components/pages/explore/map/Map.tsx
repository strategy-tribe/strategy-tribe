import { MapProjection } from './MapProjection';
import { useExploreContext } from '../ExploreContext';

export function Map() {
  const { mapData } = useExploreContext();
  return (
    <div>
      <MapProjection regions={mapData.regions} />
    </div>
  );
}
