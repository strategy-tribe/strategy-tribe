import { Privacy } from '../components/pages/landing/Privacy';
import Hero from '@/components/pages/landing/Hero';
import Head from 'next/head';
import React from 'react';
import { NextPageWithLayout } from './_app';
import LandingLayout from '@/components/layouts/LandingLayout';

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
