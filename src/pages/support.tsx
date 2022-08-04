import { motion } from 'framer-motion';
import Head from 'next/head';

import AppLayout from '@/components/layouts/AppLayout';
import LandingLayout from '@/components/layouts/LandingLayout';
import { Section } from '@/components/pages/landing/Section';
import { SpreadTheWord } from '@/components/pages/support/SpreadTheWord';

import { NextPageWithLayout } from './_app';

const GeneralDonationsPage: NextPageWithLayout = () => {
  return (
    <div className="text-on-surface-p1 space-y-8">
      <Head>
        <title>ST | Support StrategyTribe</title>
        <meta
          name="description"
          content="StrategyTribe was born from a need for higher quality, better scaled OSINT work on the
          world's most important threat actors. We aim to centralize, organize
          and incentivise the collection of widely important data by
          individuals."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <>
        {/* Content */}
        <Section>
          <motion.div
            className="space-y-16 pb-48 max-w-lg"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="h4 laptop:h3 font-inter font-bold text-on-surface-p0">
              Submitting findings is not the only way to help
            </h2>
            {/* <Donate /> */}
            <SpreadTheWord />
          </motion.div>
        </Section>
      </>
    </div>
  );
};

GeneralDonationsPage.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};

export default GeneralDonationsPage;
GeneralDonationsPage.getLayout = function getLayout(page) {
  return <LandingLayout>{page}</LandingLayout>;
};
