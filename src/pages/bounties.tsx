import { Explore } from '@/components/pages/explore/Explore';
import AppLayout from '@/components/layouts/AppLayout';
import { NextPageWithLayout } from './_app';
import Head from 'next/head';
import { GetStaticProps } from 'next';
import { dehydrate } from 'react-query';
import { prefetchExploreQueries } from '@/lib/models/explore/PrefetchExploreQueries';
import Moralis from 'moralis/node';

export const getStaticProps: GetStaticProps = async () => {
  //*Prefetch queries
  const queryClient = await prefetchExploreQueries(Moralis);
  const prefetchedQueries = dehydrate(queryClient);

  //*Map data
  // const mapData = await getMapData(Moralis);

  //*Return props
  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(prefetchedQueries)),
      // mapData: JSON.parse(JSON.stringify(mapData)),
    },
    revalidate: 10,
  };
};

const BountiesPage: NextPageWithLayout = () => {
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
      <Explore mapData={{ regions: [], id: '', createdAt: new Date() }} />
    </>
  );
};

export default BountiesPage;

BountiesPage.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};
