import { createProxySSGHelpers } from '@trpc/react-query/ssg';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import superjson from 'superjson';

import { MapDataWithFeatures } from '@/lib/models/MapData';
import { overcomeSerialization } from '@/lib/utils/overcomeSerialization';

import AppLayout from '@/components/layouts/AppLayout';
import { Explore } from '@/components/pages/explore/Explore';
import { DEFAULT_FILTER } from '@/components/pages/explore/filters/utils/DefaultFilter';

import { createContextInner } from '@/server/context';
import prisma from '@/server/prisma/prismaClient';
import { getMapData } from '@/server/routers/map';
import { appRouter } from '@/server/routers/_app';

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
  return {
    props: {
      trpcState: ssg.dehydrate(),
      mapData: parsedData,
    },
    revalidate: 60 * 5, //every 5 minutes
  };
};

const BountiesPage: NextPageWithLayout<{ mapData: MapDataWithFeatures }> = ({
  mapData,
}: {
  mapData: MapDataWithFeatures;
}) => {
  return (
    <>
      <Head>
        <title>ST | Home</title>
        <meta
          name="description"
          content=" An open source project dedicated to crowdsourcing and crowdfunding
          OSINT for locating the cryptowallets of threat actors."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Explore data={mapData} />
    </>
  );
};

export default BountiesPage;

BountiesPage.getLayout = function getLayout(page) {
  return <AppLayout hideBgOnScroll>{page}</AppLayout>;
};
