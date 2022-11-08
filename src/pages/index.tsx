import Head from 'next/head';

import AppLayout from '@/components/layouts/AppLayout';
import Hero from '@/components/pages/landing/Hero';

import { NextPageWithLayout } from './_app';
import { Privacy } from '../components/pages/landing/Privacy';

const LandingPage: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>StrategyTribe</title>
        <meta
          name="description"
          content=" An open source project dedicated to crowdsourcing and crowdfunding
          OSINT for locating the cryptowallets of threat actors."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <Hero />
        <Privacy />
      </div>
    </>
  );
};

LandingPage.getLayout = function getLayout(page) {
  return <AppLayout hideBgOnScroll>{page}</AppLayout>;
};
export default LandingPage;
