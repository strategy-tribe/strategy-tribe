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
          property="og:description"
          content=" An open source project dedicated to crowdsourcing and crowdfunding
          OSINT for locating the cryptowallets of threat actors."
        />
        <meta property="og:title" content="StrategyTribe" />
        <meta property="og:image" content="/images/stCover.png" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:domain" content="strategytribe.io/" />
        <meta name="twitter:image" content="/images/stCover.png" />
        <meta name="twitter:title" content="StrategyTribe" />
        <meta
          name="twitter:description"
          content=" An open source project dedicated to crowdsourcing and crowdfunding
          OSINT for locating the cryptowallets of threat actors."
        />
        <meta name="twitter:url" content="https://www.strategytribe.io/" />
        <meta name="twitter:image:src" content="/images/stCover.png" />
        <meta name="twitter:image:width" content="1200" />
        <meta name="twitter:image:height" content="630" />
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
