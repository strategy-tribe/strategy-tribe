import { motion } from 'framer-motion';
import Head from 'next/head';

import AppLayout from '@/components/layouts/AppLayout';
import { NotFound } from '@/components/utils/NotFound';

import { NextPageWithLayout } from './_app';

const _404Page: NextPageWithLayout = () => {
  return (
    <div className="space-y-8 text-on-surface-p1">
      <Head>
        <title>404</title>
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
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <NotFound />
        </motion.div>
      </>
    </div>
  );
};

export default _404Page;
_404Page.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};
