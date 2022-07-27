// const Moralis = require('moralis/node');
import Moralis from 'moralis/node';
import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { dehydrate, QueryClient } from 'react-query';

import { useGetBounty } from '@/hooks/bountyHooks';
import { Moralis_useGetBounty } from '@/lib/moralis/serverMethods/Moralis_Bounties';

import AppLayout from '@/components/layouts/AppLayout';
import { Bounty } from '@/components/pages/bounty/Bounty';
import Loading from '@/components/utils/Loading';

import { NextPageWithLayout } from '@/pages/_app';
import Queries from '@/utils/Queries';

export const getStaticPaths: GetStaticPaths = async () => {
  const moralis_serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
  const moralis_appId = process.env.NEXT_PUBLIC_APP_ID;

  await Moralis.start({
    serverUrl: moralis_serverUrl,
    appId: moralis_appId,
  });

  const response = await Moralis.Cloud.run('getBountiesIds');
  const ids: string[] = response.ids;

  const paths = ids.map((id) => {
    return { params: { id } };
  });

  return {
    fallback: 'blocking',
    paths,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context?.params?.id;

  if (id as string) {
    const queryClient = new QueryClient();

    const moralis_serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
    const moralis_appId = process.env.NEXT_PUBLIC_APP_ID;

    await Moralis.start({
      serverUrl: moralis_serverUrl,
      appId: moralis_appId,
    });

    const queryId = [Queries.OneBounty, id];
    const { fetch } = Moralis_useGetBounty(id as string, Moralis);

    let bounty: any;
    await queryClient.prefetchQuery(queryId, async () => {
      bounty = await fetch();
      return bounty;
    });

    if (!bounty) {
      return {
        notFound: true,
      };
    }
    return {
      props: {
        dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
      },
      revalidate: 10,
    };
  } else {
    return {
      notFound: true,
    };
  }
};

const BountyPage: NextPageWithLayout = () => {
  //*Router
  const router = useRouter();
  const { id: bountyId } = router.query;

  //*Queires
  const { bounty, isLoading } = useGetBounty(bountyId as string, !!bountyId);

  if (isLoading) return <Loading />;

  if (bounty) {
    return (
      <>
        <Head>
          <title>ST | Bounty</title>
          <meta
            name="description"
            content=" An open source project dedicated to crowdsourcing and crowdfunding
          OSINT for locating the cryptowallets of threat actors."
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Bounty bounty={bounty} />
      </>
    );
  }

  return <span>Error</span>;
};

export default BountyPage;
BountyPage.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};
