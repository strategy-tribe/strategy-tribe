import Head from 'next/head';

import LandingLayout from '@/components/layouts/LandingLayout';
import Hero from '@/components/pages/landing/Hero';

import { Privacy } from '../components/pages/landing/Privacy';
import { NextPageWithLayout } from './_app';

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
  return <LandingLayout hideBgOnScroll>{page}</LandingLayout>;
};
export default LandingPage;
