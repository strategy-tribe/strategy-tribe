import { useQuery } from 'react-query';
import { CountryData } from './CountryData';

export const useGetMapData = () => {
  const { data, isLoading, error } = useQuery(
    'countries',
    async () => {
      const res = await fetch('/api/info');
      const data = await res.json();
      return data as {
        countries: CountryData[];
        features: any[];
      };
    },
    {
      staleTime: Infinity,
      cacheTime: Infinity,
    }
  );

  return { data, isLoading, error };
};
