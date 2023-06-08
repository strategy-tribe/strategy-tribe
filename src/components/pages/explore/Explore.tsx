import dynamic from 'next/dynamic';
import router from 'next/router';

import { MapDataWithFeatures } from '@/lib/models/MapData';
import { GoToBountiesPage } from '@/lib/utils/Routes';

import { ImportantMessage } from '@/components/utils/Warning';

import { useAuth } from '@/auth/AuthContext';
import { AvgSubmissionPayoutData } from '@/server/routes/statistics/getAvgSubmissionPayout';
import { BountiesStatusData } from '@/server/routes/statistics/getBountiesStatus';
import { FundData } from '@/server/routes/statistics/getFundsData';
import { SubmissionsGrowthData } from '@/server/routes/statistics/getSubmissionGrowth';
import { SubmissionsStatusData } from '@/server/routes/statistics/getSubmissionsStatus';
import { UsersCountData } from '@/server/routes/statistics/getUsersCount';

import { BountyBoard } from './BountyBoard';
import { ExploreContextProvider, useExploreContext } from './ExploreContext';
import { ExploreFilters } from './filters/ExploreFilters';
import { PageControls } from './PageControls';
import { Section } from '../landing/Section';

const Map = dynamic(import('./map/MapProjection'), {
  ssr: false,
});

const BountiesStatus = dynamic(import('./statistics/BountiesStatus'), {
  ssr: false,
});

const SubmissionsStates = dynamic(import('./statistics/SubmissionStates'), {
  ssr: false,
});

const Users = dynamic(import('./statistics/Users'), {
  ssr: false,
});

const SubmissionData = dynamic(import('./statistics/SubmissionData'), {
  ssr: false,
});

const SubmissionsGrowth = dynamic(import('./statistics/SubmissionGrowth'), {
  ssr: false,
});

export function Explore({
  data,
  bountyStatusData,
  submissionStatesData,
  usersCount,
  avgSubmissionPayout,
  bountyTrendChartData,
  submissionsGrowth,
}: {
  data: MapDataWithFeatures | undefined;
  bountyStatusData: BountiesStatusData | undefined;
  submissionStatesData: SubmissionsStatusData | undefined;
  usersCount: UsersCountData | undefined;
  avgSubmissionPayout: AvgSubmissionPayoutData | undefined;
  bountyTrendChartData: FundData | undefined;
  submissionsGrowth: SubmissionsGrowthData | undefined;
}) {
  return (
    <>
      <ExploreContextProvider
        data={data}
        bountyStatusData={bountyStatusData}
        submissionStatesData={submissionStatesData}
        usersCount={usersCount}
        avgSubmissionPayout={avgSubmissionPayout}
        bountyTrendChartData={bountyTrendChartData}
        submissionsGrowth={submissionsGrowth}
      >
        <ExploreContent />
      </ExploreContextProvider>
    </>
  );
}

function ExploreContent() {
  const { bountyFetch } = useExploreContext();

  const error = bountyFetch?.error ?? '';
  const { userId, isAuthenticated } = useAuth();

  if (error) {
    console.error(error);
    return <></>;
  }

  return (
    <>
      <div className="success mx-auto flex w-full max-w-7xl gap-y-8 px-2 sm:flex-col tablet:flex-row tablet:pt-20 bt:pt-3">
        <div className="sm:w-full tablet:w-2/3">
          <Section>{!!BountiesStatus && <BountiesStatus />}</Section>
        </div>
        <div className="pl-4 sm:w-full tablet:w-1/3">
          <Section>{!!SubmissionsGrowth && <SubmissionsGrowth />}</Section>
          <Section>{!!Users && <Users />}</Section>
          <Section>{!!SubmissionData && <SubmissionData />}</Section>
        </div>
      </div>
      <div>
        {/* <Section>{!!Map && <Map />}</Section> */}

        <div className="flex min-h-screen w-full flex-col gap-y-8 p-4">
          <>
            <Section className="w-full">
              {isAuthenticated && !!userId && <ExploreFilters />}
              {(!isAuthenticated || !userId) && (
                <ImportantMessage
                  className="mx-auto w-full max-w-xs p-2"
                  icon="info"
                  content={
                    <button
                      onClick={() =>
                        router.push(`${GoToBountiesPage()}?login=true`)
                      }
                      className="label mt-2"
                    >
                      <span className="underline">
                        Sign in to filter the bounties
                      </span>
                    </button>
                  }
                />
              )}
            </Section>
            <div className="space-y-8">
              <PageNumber />
              <BountyBoard />
            </div>
            <div className="flex grow basis-0 flex-wrap items-end justify-center ">
              <PageControls />
            </div>
          </>
        </div>
      </div>
    </>
  );
}

function PageNumber() {
  const { bountyFetch } = useExploreContext();

  const lastPage = bountyFetch?.numOfPages;
  if (!lastPage) return <></>;

  return (
    <Section>
      <span className="label text-main-light">
        Page {(bountyFetch?.page ?? 0) + 1} of {lastPage}
      </span>
    </Section>
  );
}
