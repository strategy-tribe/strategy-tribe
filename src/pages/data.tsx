import Head from 'next/head';

import AppLayout from '@/components/layouts/AppLayout';
import { SubmissionDumpList } from '@/components/pages/admin/submissions/submissionDump/SubmissionDumpList';
import { ImportantMessage } from '@/components/utils/Warning';

import { useAuth } from '@/auth/AuthContext';

import { NextPageWithLayout } from './_app';

('@/components/utils/Title');

const DataPage: NextPageWithLayout = () => {
  const { isDataDumpUser, isAdmin, isStaff, isFetchingUserInfo } = useAuth();

  return (
    <div className="space-y-8 text-on-surface-p1">
      <Head>
        <title>Submissions Data</title>
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
        {!isFetchingUserInfo && (isDataDumpUser || isAdmin || isStaff) && (
          <SubmissionDumpList />
        )}
        {!isFetchingUserInfo && !(isDataDumpUser || isAdmin || isStaff) && (
          <ImportantMessage message="Unauthorized" />
        )}
      </div>
    </div>
  );
};

DataPage.getLayout = function getLayout(page) {
  return (
    <>
      <AppLayout>{page}</AppLayout>
    </>
  );
};
export default DataPage;
