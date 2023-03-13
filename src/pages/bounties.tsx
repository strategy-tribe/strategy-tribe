import { createProxySSGHelpers } from '@trpc/react-query/ssg';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import superjson from 'superjson';

import { MapDataWithFeatures } from '@/lib/models/MapData';
import { overcomeSerialization } from '@/lib/utils/overcomeSerialization';
import { getDates } from '@/lib/utils/statisticsHelpers';
import { TrendChartData } from '@/lib/utils/statisticsHelpers';

import AppLayout from '@/components/layouts/AppLayout';
import { Explore } from '@/components/pages/explore/Explore';
import { DEFAULT_FILTER } from '@/components/pages/explore/filters/utils/DefaultFilter';

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
  _getLastWeekPaidBountiesData,
  PaidBountiesData,
} from '@/server/routes/statistics/getPaidBounties';
import {
  _getSubmissionsStatusData,
  SubmissionsStatusData,
} from '@/server/routes/statistics/getSubmissionsStatus';
import {
  _getLastWeekTotalBountiesFundData,
  TotalBountyFundData,
} from '@/server/routes/statistics/getTotalBountiesFund';
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

  //Total paid bounties
  const paidData: PaidBountiesData = await _getLastWeekPaidBountiesData(prisma);

  //Total bounty funding
  const totalBountyFunding: TotalBountyFundData =
    await _getLastWeekTotalBountiesFundData(prisma);

  const bountyTrendChartData: TrendChartData = {
    totalBountyFunding: totalBountyFunding,
    bountyAmountPaid: paidData,
    labels: getDates(true),
  };

  return {
    props: {
      trpcState: ssg.dehydrate(),
      mapData: parsedData,
      bountyStatusData: bountyStatusData,
      submissionStatesData: submissionStatesData,
      usersCount: usersCount,
      avgSubmissionPayout: submissionPayoutData,
      bountyTrendChartData: bountyTrendChartData,
    },
    revalidate: 60 * 5, //every 5 minutes
  };
};

const BountiesPage: NextPageWithLayout<{
  mapData: MapDataWithFeatures;
  bountyStatusData: BountiesStatusData;
  submissionStatesData: SubmissionsStatusData;
  usersCount: UsersCountData;
  avgSubmissionPayout: AvgSubmissionPayoutData;
  bountyTrendChartData: TrendChartData;
}> = ({
  mapData,
  bountyStatusData,
  submissionStatesData,
  usersCount,
  avgSubmissionPayout,
  bountyTrendChartData,
}: {
  mapData: MapDataWithFeatures;
  bountyStatusData: BountiesStatusData;
  submissionStatesData: SubmissionsStatusData;
  usersCount: UsersCountData;
  avgSubmissionPayout: AvgSubmissionPayoutData;
  bountyTrendChartData: TrendChartData;
}) => {
  return (
    <>
      <Head>
        <title>Home</title>
        <meta
          name="description"
          content=" An open source project dedicated to crowdsourcing and crowdfunding
          OSINT for locating the cryptowallets of threat actors."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Explore
        data={mapData}
        bountyStatusData={bountyStatusData}
        submissionStatesData={submissionStatesData}
        usersCount={usersCount}
        avgSubmissionPayout={avgSubmissionPayout}
        bountyTrendChartData={bountyTrendChartData}
      />
    </>
  );
};

export default BountiesPage;

BountiesPage.getLayout = function getLayout(page) {
  return <AppLayout hideBgOnScroll>{page}</AppLayout>;
};
