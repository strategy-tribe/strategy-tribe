import { RegionData } from '@/lib/models/map/RegionStats';
import { useGetColor } from '@/lib/models/map/useGetColor';
import { useExploreContext } from '../ExploreContext';

export function MapLegend() {
  const { regions } = useExploreContext();
  const { getColor } = useGetColor(regions);
  const { selected } = useExploreContext();

  return (
    <div className="grid grid-cols-6 gap-4 items-center sticky bottom-0 bg-black p-8">
      {regions
        .sort((a, b) => b.amountOfBounties - a.amountOfBounties)
        .map((r) => (
          <div key={r.name} className="flex items-center gap-2">
            <span
              className="h-2 w-2 rounded"
              style={{
                background: getColor(r),
              }}
            ></span>
            <span
              className={`capitalize label-sm ${selected === r && 'underline'}`}
            >
              {r.name || 'Unknown'} ({r.amountOfBounties})
            </span>
          </div>
        ))}
    </div>
  );
}
