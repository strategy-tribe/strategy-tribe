import { RegionData } from '@/lib/models/map/RegionStats';
import { useGetColor } from '@/lib/models/map/useGetColor';
import React from 'react';
export function MapLegend({ regions }: { regions: RegionData[] }) {
  const { getColor } = useGetColor(regions);

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
            <span className="capitalize label-sm">
              {r.name || 'Unknown'} ({r.amountOfBounties})
            </span>
          </div>
        ))}
    </div>
  );
}
