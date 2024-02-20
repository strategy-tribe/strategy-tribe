('@/components/utils/Title');
import Head from 'next/head';

import AppLayout from '@/components/layouts/AppLayout';
import { ApiUserList } from '@/components/pages/apiUsers/ApiUserList';

import { NextPageWithLayout } from '@/pages/_app';

('@/components/utils/Title');

const NewApiUserPage: NextPageWithLayout = () => {
  return (
    <div className="space-y-8 text-on-surface-p1">
      <Head>
        <title>ApiUsers</title>
        <meta
          name="description"
          content="StrategyTribe was born from a need for higher quality, better scaled OSINT work on the
          world's most important threat actors. We aim to centralize, organize
          and incentivise the collection of widely important data by
          individuals."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="mx-auto min-h-screen max-w-7xl space-y-8 p-4">
        <ApiUserList />
      </div>
    </div>
  );
};

export default NewApiUserPage;
NewApiUserPage.getLayout = function getLayout(page) {
  return (
    <>
      <AppLayout>{page}</AppLayout>
    </>
  );
};
