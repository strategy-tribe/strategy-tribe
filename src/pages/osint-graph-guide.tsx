import Head from 'next/head';

import AppLayout from '@/components/layouts/AppLayout';
import { OsintGraphGuide } from '@/components/pages/faq/OsintGraphGuide';

import { NextPageWithLayout } from './_app';

const OsintGraphGuidePage: NextPageWithLayout = () => {
  return (
    <div className="space-y-8 text-on-surface-p1">
      <Head>
        <title>OSINT-Graph Guide</title>
        <meta
          name="description"
          content="StrategyTribe was born from a need for higher quality, better scaled OSINT work on the
          world's most important threat actors. We aim to centralize, organize
          and incentivise the collection of widely important data by
          individuals."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="mx-auto max-w-4xl space-y-12 px-4">
        <OsintGraphGuide />
      </div>
    </div>
  );
};

export default OsintGraphGuidePage;

OsintGraphGuidePage.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};
