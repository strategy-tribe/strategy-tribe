import dynamic from 'next/dynamic';

import { MapDataWithFeatures } from '@/lib/models/MapData';

import { AvgSubmissionPayoutData } from '@/server/routes/statistics/getAvgSubmissionPayout';
import { BountiesStatusData } from '@/server/routes/statistics/getBountiesStatus';
import { FundData } from '@/server/routes/statistics/getFundsData';
import { SubmissionsStatusData } from '@/server/routes/statistics/getSubmissionsStatus';
import { UsersCountData } from '@/server/routes/statistics/getUsersCount';

import { Section } from '../landing/Section';
import { BountyBoard } from './BountyBoard';
import { ExploreContextProvider, useExploreContext } from './ExploreContext';
import { ExploreFilters } from './filters/ExploreFilters';
import { PageControls } from './PageControls';
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

export function Explore({
  data,
  bountyStatusData,
  submissionStatesData,
  usersCount,
  avgSubmissionPayout,
  bountyTrendChartData,
}: {
  data: MapDataWithFeatures | undefined;
  bountyStatusData: BountiesStatusData | undefined;
  submissionStatesData: SubmissionsStatusData | undefined;
  usersCount: UsersCountData | undefined;
  avgSubmissionPayout: AvgSubmissionPayoutData | undefined;
  bountyTrendChartData: FundData | undefined;
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
      >
        <ExploreContent />
      </ExploreContextProvider>
    </>
  );
}

function ExploreContent() {
  const { bountyFetch } = useExploreContext();

  const error = bountyFetch?.error ?? '';

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
          <Section>{!!SubmissionsStates && <SubmissionsStates />}</Section>
          <Section>{!!Users && <Users />}</Section>
          <Section>{!!SubmissionData && <SubmissionData />}</Section>
        </div>
      </div>
      <div>
        {/* <Section>{!!Map && <Map />}</Section> */}

        <div className="flex min-h-screen w-full flex-col gap-y-8 p-4">
          <>
            <Section className="w-full">
              <ExploreFilters />
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
