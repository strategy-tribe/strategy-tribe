import { MapData } from '@/lib/models/map/MapData';
import { CountryData } from '@/lib/models/map/CountryData';
import { useContext, createContext, ReactNode, useState } from 'react';
import { useUrlSearchParams } from '@/lib/hooks/useUrlSearchParams';
import { useGetBounties } from '@/lib/hooks/bountyHooks';

interface iExploreContext {
  bountyFetch: ReturnType<typeof useGetBounties>;
}

//@ts-ignore
const ExploreContext = createContext<iExploreContext>();

export const ExploreContextProvider = ({
  children,
  mapData,
}: {
  children: ReactNode;
  mapData: MapData;
}) => {
  const { query } = useUrlSearchParams();
  const bountyFetch = useGetBounties(query, 0);

  return (
    <ExploreContext.Provider value={{ bountyFetch }}>
      {children}
    </ExploreContext.Provider>
  );
};

export const useExploreContext = () => {
  return useContext(ExploreContext);
};
