import { MapData } from '@/lib/models/map/MapData';
import { CountryData } from '@/lib/models/map/CountryData';
import { useContext, createContext, ReactNode, useState } from 'react';

interface iExploreContext {
  mapData: MapData;
  regions: CountryData[];
  selected?: CountryData;
  setSelected: (r?: CountryData) => void;
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
  const [selected, setSelected] = useState<CountryData>();

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
