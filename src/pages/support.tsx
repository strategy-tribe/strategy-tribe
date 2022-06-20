import { SpreadTheWord } from '@/components/pages/support/SpreadTheWord';
import { Donate } from '../components/pages/support/Donate';
import { Section } from '@/components/pages/landing/Section';
import AppLayout from '@/components/layouts/AppLayout';
import Navbar from '@/components/navbar/Navbar';
import { motion } from 'framer-motion';
import Head from 'next/head';
import { NextPageWithLayout } from './_app';

const GeneralDonationsPage: NextPageWithLayout = () => {
  return (
    <div className="text-text space-y-8">
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
      <Navbar
        setUp={{
          useOverflowMenu: false,
        }}
      >
        {/* Content */}
        <Section>
          <motion.div
            className="space-y-24 pb-48 max-w-lg"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="h4 laptop:h3 font-inter font-bold text-white">
              Submitting findings is not the only way to help
            </h2>
            <Donate />
            <SpreadTheWord />
          </motion.div>
        </Section>
      </Navbar>
    </div>
  );
};

GeneralDonationsPage.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};

export default GeneralDonationsPage;
