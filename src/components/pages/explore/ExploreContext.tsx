import { createContext, ReactNode, useContext } from 'react';

import { useGetBounties } from '@/lib/hooks/bountyHooks';
import { MapDataWithFeatures } from '@/lib/models/MapData';

import { useExploreUrl } from '@/components/pages/explore/useExploreUrl';

import { BountiesStatusData } from '@/server/routes/statistics/getBountiesStatus';
import { FundData } from '@/server/routes/statistics/getFundsData';
import { SubmissionsGrowthData } from '@/server/routes/statistics/getSubmissionGrowth';
import { SubmissionsStatusData } from '@/server/routes/statistics/getSubmissionsStatus';
import { UsersCountData } from '@/server/routes/statistics/getUsersCount';

interface iExploreContext {
  bountyFetch: ReturnType<typeof useGetBounties> | undefined;
  countries: string[];
  addCountry: (country: string) => void;
  removeCountry: (country: string) => void;
  map: MapDataWithFeatures | undefined;
  bountyStatusData: BountiesStatusData | undefined;
  submissionStatesData: SubmissionsStatusData | undefined;
  usersCount: UsersCountData | undefined;
  avgSubmissionPayout: number | undefined;
  bountyTrendChartData: FundData | undefined;
  submissionsGrowth: SubmissionsGrowthData | undefined;
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
  bountyStatusData: undefined,
  submissionStatesData: undefined,
  usersCount: undefined,
  avgSubmissionPayout: undefined,
  bountyTrendChartData: undefined,
  submissionsGrowth: undefined,
});

export const ExploreContextProvider = ({
  children,
  data,
  bountyStatusData,
  submissionStatesData,
  usersCount,
  avgSubmissionPayout,
  bountyTrendChartData,
  submissionsGrowth,
}: {
  children: ReactNode;

  data: MapDataWithFeatures | undefined;
  bountyStatusData: BountiesStatusData | undefined;
  submissionStatesData: SubmissionsStatusData | undefined;
  usersCount: UsersCountData | undefined;
  avgSubmissionPayout: number | undefined;
  bountyTrendChartData: FundData | undefined;
  submissionsGrowth: SubmissionsGrowthData | undefined;
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
        bountyStatusData,
        submissionStatesData,
        usersCount,
        avgSubmissionPayout,
        bountyTrendChartData,
        submissionsGrowth,
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
