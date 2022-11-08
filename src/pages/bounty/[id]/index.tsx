// const Moralis = require('moralis/node');

import Head from 'next/head';
import { useRouter } from 'next/router';

import { useGetBounty } from '@/lib/hooks/bountyHooks';

import AppLayout from '@/components/layouts/AppLayout';
import { Bounty } from '@/components/pages/bounty/Bounty';
import Loading from '@/components/utils/Loading';

import { NextPageWithLayout } from '@/pages/_app';

const BountyPage: NextPageWithLayout = () => {
  //*Router
  const router = useRouter();
  const { id: slug } = router.query;

  //*Queires
  const { bounty, isLoading } = useGetBounty(slug as string, !!slug);

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
