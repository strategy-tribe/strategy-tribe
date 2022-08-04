import { motion } from 'framer-motion';
import Head from 'next/head';

import AppLayout from '@/components/layouts/AppLayout';
import { About } from '@/components/pages/about/About';
import { Goal } from '@/components/pages/about/Goal';
import { Mission } from '@/components/pages/about/Mission';
import { Section } from '@/components/pages/landing/Section';

import { NextPageWithLayout } from './_app';

const AboutUsPage: NextPageWithLayout = () => {
  return (
    <div className="text-on-surface-p1 space-y-8">
      <Head>
        <title>ST | About us</title>
        <meta
          name="description"
          content="StrategyTribe was born from a need for higher quality, better scaled OSINT work on the
          world's most important threat actors. We aim to centralize, organize
          and incentivise the collection of widely important data by
          individuals."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <Section>
          <motion.div
            className="space-y-16 pb-48"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="h4 laptop:h3 font-inter font-bold text-on-surface-p0">
              Re: StrategyTribe
            </h2>
            <About />
            <Mission />
            <Goal />
          </motion.div>
        </Section>
      </div>
    </div>
  );
};

export default AboutUsPage;

AboutUsPage.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};
