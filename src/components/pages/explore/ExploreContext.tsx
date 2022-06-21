import { MapData } from '@/lib/models/map/MapData';
import { RegionData } from '@/lib/models/map/RegionStats';
import { useContext, createContext, ReactNode, useState } from 'react';

interface iExploreContext {
  mapData: MapData;
  regions: RegionData[];
  selected?: RegionData;
  setSelected: (r?: RegionData) => void;
}

const ExploreContext = createContext<iExploreContext>({
  mapData: { regions: [], id: '', createdAt: new Date() },
  setSelected: () => {},
  regions: [],
});

export const ExploreContextProvider = ({
  children,
  mapData,
}: {
  children: ReactNode;
  mapData: MapData;
}) => {
  const [selected, setSelected] = useState<RegionData>();

  return (
    <ExploreContext.Provider
      value={{ mapData, regions: mapData.regions, selected, setSelected }}
    >
      {children}
    </ExploreContext.Provider>
  );
};

export const useExploreContext = () => {
  return useContext(ExploreContext);
};
