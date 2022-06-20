import { MapProjection } from './MapProjection';
import { useExploreContext } from '../ExploreContext';
import { useGetColor } from '@/lib/models/map/useGetColor';
import { Title } from '@/components/utils/Title';

export function Map() {
  const { mapData } = useExploreContext();

  const { getColor } = useGetColor(mapData.regions);
  return (
    <div className="space-y-4">
      <Title title="World wide bounties" />

      <MapProjection regions={mapData.regions} />

      <div className="grid grid-cols-6 gap-4 items-center sticky bottom-0 bg-black p-8">
        {mapData.regions.map((r) => (
          <div key={r.name} className="flex items-center gap-2">
            <span
              className="h-2 w-2 rounded"
              style={{ background: getColor(r) }}
            ></span>
            <span className="capitalize label-sm">
              {r.name || 'Unknown'} ({r.amountOfBounties})
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
