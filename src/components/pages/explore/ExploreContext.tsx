import { createContext, ReactNode, useContext } from 'react';

import { useGetBounties } from '@/lib/hooks/bountyHooks';
import { useUrlSearchParams } from '@/lib/hooks/useUrlSearchParams';
import { MapData } from '@/lib/models/map/MapData';

interface iExploreContext {
  bountyFetch: ReturnType<typeof useGetBounties> | undefined;
  countries: string[];
  addCountry: (country: string) => void;
  removeCountry: (country: string) => void;
  map: MapData | undefined;
}

const ExploreContext = createContext<iExploreContext>({
  bountyFetch: undefined,
  countries: [],
  addCountry: () => {
    return;
  },
  removeCountry: () => {
    return;
  },
  map: undefined,
});

export const ExploreContextProvider = ({
  children,
  data,
}: {
  children: ReactNode;
  data: MapData;
}) => {
  const { query, setQuery } = useUrlSearchParams();
  const bountyFetch = useGetBounties(query);

  function addCountry(newCountry: string) {
    if (query.countries?.includes(newCountry)) return;
    else {
      const oldCountries = query.countries || [];
      setQuery({ ...query, countries: [...oldCountries, newCountry] });
    }
  }
  function removeCountry(country: string) {
    if (!query.countries?.includes(country)) return;
    else {
      const countries = query.countries.filter((c) => c !== country) || [];
      setQuery({ ...query, countries });
    }
  }

  return (
    <ExploreContext.Provider
      value={{
        map: data,
        bountyFetch,
        countries: query.countries || [],
        addCountry,
        removeCountry,
      }}
    >
      {children}
    </ExploreContext.Provider>
  );
};

export const useExploreContext = () => {
  return useContext(ExploreContext);
};
