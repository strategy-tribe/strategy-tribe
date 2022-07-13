import { Explore } from '@/components/pages/explore/Explore';
import AppLayout from '@/components/layouts/AppLayout';
import { NextPageWithLayout } from './_app';
import Head from 'next/head';
import { GetStaticProps } from 'next';
import { CountriesData } from '@/lib/models/map/CountriesData';
import { MapData } from '@/lib/models/map/MapData';
import Moralis from 'moralis/node';
import fs from 'fs';

const getMapData = async (): Promise<MapData> => {
  const moralis_serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
  const moralis_appId = process.env.NEXT_PUBLIC_APP_ID;

  await Moralis.start({
    serverUrl: moralis_serverUrl,
    appId: moralis_appId,
  });

  const res = await Moralis.Cloud.run('getMapStats');

  const mapData: CountriesData = {
    id: res.id,
    createdAt: res.attributes.createdAt,
    countries: res.attributes.stats,
  };

  const path = './public/data/features.json';
  const featuresRaw = fs.readFileSync(path, {
    encoding: 'utf-8',
  });

  const features = JSON.parse(featuresRaw).features;

  return { mapData, features };
};

export const getStaticProps: GetStaticProps = async () => {
  //*Prefetch queries
  // const queryClient = await prefetchExploreQueries(Moralis);
  // const prefetchedQueries = dehydrate(queryClient);

  //*Map data
  const data = await getMapData();

  //*Return props
  return {
    props: {
      // dehydratedState: JSON.parse(JSON.stringify(prefetchedQueries)),
      data: JSON.parse(JSON.stringify(data)),
    },
    revalidate: 10,
  };
};

const BountiesPage: NextPageWithLayout<{
  data: MapData;
}> = ({ data }) => {
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

      <Explore data={data} />
    </>
  );
};

export default BountiesPage;

BountiesPage.getLayout = function getLayout(page) {
  return <AppLayout hideBgOnScroll>{page}</AppLayout>;
};
