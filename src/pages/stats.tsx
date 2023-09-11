import { createProxySSGHelpers } from '@trpc/react-query/ssg';
import { GetStaticProps } from 'next';
import dynamic from 'next/dynamic';
import superjson from 'superjson';

import { MapDataWithFeatures } from '@/lib/models/MapData';
import { overcomeSerialization } from '@/lib/utils/overcomeSerialization';

import AppLayout from '@/components/layouts/AppLayout';
import { DEFAULT_FILTER } from '@/components/pages/explore/filters/utils/DefaultFilter';
import { Section } from '@/components/pages/landing/Section';

import { createContextInner } from '@/server/context';
import prisma from '@/server/prisma/prismaClient';
import { appRouter } from '@/server/routers/_app';
import { getMapData } from '@/server/routers/map';
import {
  _getAvgSubmissionPayoutData,
  AvgSubmissionPayoutData,
} from '@/server/routes/statistics/getAvgSubmissionPayout';
import {
  _getBountiesStatusData,
  BountiesStatusData,
} from '@/server/routes/statistics/getBountiesStatus';
import {
  _getFundData,
  FundData,
} from '@/server/routes/statistics/getFundsData';
import {
  _getSubmissionsGrowth,
  SubmissionsGrowthData,
} from '@/server/routes/statistics/getSubmissionGrowth';
import {
  _getSubmissionsStatusData,
  SubmissionsStatusData,
} from '@/server/routes/statistics/getSubmissionsStatus';
import {
  _getUsersCountData,
  UsersCountData,
} from '@/server/routes/statistics/getUsersCount';

import { NextPageWithLayout } from './_app';

export const getStaticProps: GetStaticProps = async () => {
  //We can't cache of all the possible filters, but we can cache the default one.
  //The default one is defined.
  //we can prefetch this with tRPC instructions: https://trpc.io/docs/ssg-helpers
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: await createContextInner(),
    transformer: superjson, // optional - adds superjson serialization
  });

  await ssg.bounty.getBounties.prefetch({ ...DEFAULT_FILTER.query });

  //#region Map data
  const mapData = await getMapData(prisma);
  const parsedData = overcomeSerialization(mapData);
  //#endregion Map Data

  //#Bounty Status data - Open/Closed/Waiting For Funds
  const bountyStatusData: BountiesStatusData = await _getBountiesStatusData(
    prisma
  );

  //#Submissions data  - Accepted/Rejected/ Waiting For Review, Submitted data(Name/Email/Domain/Wallet)
  const submissionStatesData: SubmissionsStatusData =
    await _getSubmissionsStatusData(prisma);

  //Users Count
  const usersCount: UsersCountData = await _getUsersCountData(prisma);

  //Submission Payout
  const submissionPayoutData: AvgSubmissionPayoutData =
    await _getAvgSubmissionPayoutData(prisma);

  // Paid and Total fund data
  const totalBountyFunding: FundData = await _getFundData(prisma);

  // Submissions Growth
  const submissionsGrowth: SubmissionsGrowthData = await _getSubmissionsGrowth(
    prisma
  );

  return {
    props: {
      trpcState: ssg.dehydrate(),
      mapData: parsedData,
      bountyStatusData: bountyStatusData,
      submissionStatesData: submissionStatesData,
      usersCount: usersCount,
      avgSubmissionPayout: submissionPayoutData,
      bountyTrendChartData: totalBountyFunding,
      submissionsGrowth: submissionsGrowth,
    },
    revalidate: 60, //every minute
  };
};

const Map = dynamic(import('../components/pages/stats/map/MapProjection'), {
  ssr: false,
});

const BountiesStatus = dynamic(
  import('../components/pages/stats/statistics/BountiesStatus'),
  {
    ssr: false,
  }
);

const SubmissionsStates = dynamic(
  import('../components/pages/stats/statistics/SubmissionStates'),
  {
    ssr: false,
  }
);

const Users = dynamic(import('../components/pages/stats/statistics/Users'), {
  ssr: false,
});

const SubmissionData = dynamic(
  import('../components/pages/stats/statistics/SubmissionData'),
  {
    ssr: false,
  }
);

const SubmissionsGrowth = dynamic(
  import('../components/pages/stats/statistics/SubmissionGrowth'),
  {
    ssr: false,
  }
);

const StatsPage: NextPageWithLayout<{
  mapData: MapDataWithFeatures;
  bountyStatusData: BountiesStatusData;
  submissionStatesData: SubmissionsStatusData;
  usersCount: UsersCountData;
  avgSubmissionPayout: AvgSubmissionPayoutData;
  bountyTrendChartData: FundData;
  submissionsGrowth: SubmissionsGrowthData;
}> = ({
  mapData,
  bountyStatusData,
  submissionStatesData,
  usersCount,
  avgSubmissionPayout,
  bountyTrendChartData,
  submissionsGrowth,
}: {
  mapData: MapDataWithFeatures;
  bountyStatusData: BountiesStatusData;
  submissionStatesData: SubmissionsStatusData;
  usersCount: UsersCountData;
  avgSubmissionPayout: AvgSubmissionPayoutData;
  bountyTrendChartData: FundData;
  submissionsGrowth: SubmissionsGrowthData;
}) => {
  return (
    <div className="p-4">
      <div className="success mx-auto flex w-full max-w-7xl gap-y-8 px-2 sm:flex-col tablet:flex-row tablet:pt-20 bt:pt-3">
        <div className="sm:w-full tablet:w-2/3">
          <Section>
            {!!BountiesStatus && (
              <BountiesStatus
                bountyStatusData={bountyStatusData}
                bountyTrendChartData={bountyTrendChartData}
              />
            )}
          </Section>
        </div>
        <div className="pl-4 sm:w-full tablet:w-1/3">
          <Section>
            {!!SubmissionsGrowth && (
              <SubmissionsGrowth submissionsGrowth={submissionsGrowth} />
            )}
          </Section>
          <Section>
            {!!Users && (
              <Users
                usersCount={usersCount}
                avgSubmissionPayout={avgSubmissionPayout}
              />
            )}
          </Section>
          <Section>
            {!!SubmissionData && (
              <SubmissionData submissionStatesData={submissionStatesData} />
            )}
          </Section>
        </div>
      </div>
      {/* <Section>{ <Map map={mapData}/>}</Section> */}
    </div>
  );
};

StatsPage.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};
export default StatsPage;
