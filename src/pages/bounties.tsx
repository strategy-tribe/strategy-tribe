import { createProxySSGHelpers } from '@trpc/react-query/ssg';
import { TRPCError } from '@trpc/server';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import superjson from 'superjson';

import { trpc } from '@/lib/trpc';

import AppLayout from '@/components/layouts/AppLayout';
import { Explore } from '@/components/pages/explore/Explore';
import { DEFAULT_FILTER } from '@/components/pages/explore/filters/DefaultFilter';

import { appRouter } from '@/server/routers/_app';

import { NextPageWithLayout } from './_app';

export const getStaticProps: GetStaticProps = async () => {
  try {
    const ssg = createProxySSGHelpers({
      router: appRouter,
      transformer: superjson,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      ctx: {},
    });

    await ssg.map.getMapData.prefetch();
    await ssg.bounty.getBounties.prefetch(DEFAULT_FILTER.query);

    return {
      props: {
        trpcState: ssg.dehydrate(),
      },
      revalidate: 1,
    };
  } catch (error) {
    throw new TRPCError({
      message: JSON.stringify(error),
      code: 'INTERNAL_SERVER_ERROR',
    });
  }
};

const BountiesPage: NextPageWithLayout = () => {
  const { data } = trpc.map.getMapData.useQuery();

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

      <Explore data={data?.mapData} />
    </>
  );
};

export default BountiesPage;

BountiesPage.getLayout = function getLayout(page) {
  return <AppLayout hideBgOnScroll>{page}</AppLayout>;
};
