import { MapData } from '@/lib/models/map/MapData';
import { useContext, createContext, ReactNode } from 'react';

interface iExploreContext {
  mapData: MapData;
}

const ExploreContext = createContext<iExploreContext>({
  mapData: { regions: [], id: '', createdAt: new Date() },
});

export const ExploreContextProvider = ({
  children,
  mapData,
}: {
  children: ReactNode;
  mapData: MapData;
}) => {
  return (
    <ExploreContext.Provider value={{ mapData }}>
      {children}
    </ExploreContext.Provider>
  );
};

export const useExploreContext = () => {
  return useContext(ExploreContext);
};
