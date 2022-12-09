import { GetStaticProps } from 'next';
import Head from 'next/head';

import { MapDataWithFeatures } from '@/lib/models/MapData';
import { overcomeSerialization } from '@/lib/utils/overcomeSerialization';

import AppLayout from '@/components/layouts/AppLayout';
import { Explore } from '@/components/pages/explore/Explore';

import prisma from '@/server/prisma/prismaClient';
import { getMapData } from '@/server/routers/map';

import { NextPageWithLayout } from './_app';

export const getStaticProps: GetStaticProps = async () => {
  const mapData = await getMapData(prisma);

  const parsedData = overcomeSerialization(mapData);
  return {
    props: { mapData: parsedData },
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
