('@/components/utils/Title');
import Head from 'next/head';
import router from 'next/router';

import { GoToSolutionsPage } from '@/lib/utils/Routes';

import AppLayout from '@/components/layouts/AppLayout';
import { SolutionList } from '@/components/pages/solution/SolutionList';
import { ImportantMessage } from '@/components/utils/Warning';

import { useAuth } from '@/auth/AuthContext';
import { NextPageWithLayout } from '@/pages/_app';

('@/components/utils/Title');

const NewSolutionPage: NextPageWithLayout = () => {
  const { userId, isAuthenticated } = useAuth();

  return (
    <div className="space-y-8 text-on-surface-p1">
      <Head>
        <title>Solutions</title>
        <meta
          name="description"
          content="StrategyTribe was born from a need for higher quality, better scaled OSINT work on the
          world's most important threat actors. We aim to centralize, organize
          and incentivise the collection of widely important data by
          individuals."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {isAuthenticated && !!userId && (
        <div className="mx-auto min-h-screen max-w-7xl space-y-8 p-4">
          <SolutionList />
        </div>
      )}
      {(!isAuthenticated || !userId) && (
        <ImportantMessage
          message="You're not signed in."
          className="mx-auto w-full max-w-xs"
          content={
            <button
              onClick={() => router.push(`${GoToSolutionsPage()}?login=true`)}
              className="label mt-4"
            >
              Join the hunt,
              <br />
              <span className="underline">you only need your wallet</span>
            </button>
          }
        />
      )}
    </div>
  );
};

export default NewSolutionPage;
NewSolutionPage.getLayout = function getLayout(page) {
  return (
    <>
      <AppLayout>{page}</AppLayout>
    </>
  );
};
