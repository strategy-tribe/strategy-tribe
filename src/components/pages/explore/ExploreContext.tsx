import { createContext, ReactNode, useContext } from 'react';

import { useGetBounties } from '@/lib/hooks/bountyHooks';
import { MapDataWithFeatures } from '@/lib/models/MapData';

import { useExploreUrl } from '@/components/pages/explore/useExploreUrl';

interface iExploreContext {
  bountyFetch: ReturnType<typeof useGetBounties> | undefined;
  countries: string[];
  addCountry: (country: string) => void;
  removeCountry: (country: string) => void;
  map: MapDataWithFeatures | undefined;
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
  data: MapDataWithFeatures | undefined;
}) => {
  const {
    urlFilter: { query },
    setUrlFilter,
  } = useExploreUrl();

  const bountyFetch = useGetBounties(query);

  function addCountry(newCountry: string) {
    if (query.countries?.includes(newCountry)) return;
    else {
      const oldCountries = query.countries || [];
      setUrlFilter({ countries: [...oldCountries, newCountry], page: 0 });
    }
  }
  function removeCountry(country: string) {
    if (!query.countries?.includes(country)) return;
    else {
      const countries =
        query.countries.filter((c: string) => c !== country) || [];
      setUrlFilter({ ...query, countries, page: 0 });
    }
  }

  return (
    <ExploreContext.Provider
      value={{
        map: data,
        bountyFetch,
        countries: query?.countries ?? [],
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
