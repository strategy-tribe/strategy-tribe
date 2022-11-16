import Head from 'next/head';

('@/components/utils/Title');

import AppLayout from '@/components/layouts/AppLayout';
import {
  ReviewDashboardFilters,
  ReviewDashboardHeader,
  ReviewDashboardPageControls,
  ReviewDashboardSubmissions,
} from '@/components/pages/admin/submissions/PageContent';
import AdminReviewContextProvider, {
  useAdminReview,
} from '@/components/pages/admin/submissions/ReviewContext';
import { ImportantMessage } from '@/components/utils/Warning';

import { NextPageWithLayout } from '../_app';

const SubmissionsToReviewPage: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>ST | Reviewing</title>
        <meta
          name="description"
          content="StrategyTribe was born from a need for higher quality, better scaled OSINT work on the
          world's most important threat actors. We aim to centralize, organize
          and incentivise the collection of widely important data by
          individuals."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AdminReviewContextProvider>
        <PageContent />
      </AdminReviewContextProvider>
    </>
  );
};

function PageContent() {
  const {
    submissionFetch: { error, isLoading },
  } = useAdminReview();

  return (
    <>
      <section className="mx-auto min-h-screen max-w-5xl">
        <ReviewDashboardHeader />
        <ReviewDashboardFilters />

        {!!error && !isLoading && (
          <ImportantMessage
            message="There was an error."
            content={JSON.stringify(error, null, 2)}
            icon="warning"
          />
        )}

        <div className="py-8">
          <ReviewDashboardSubmissions />
        </div>

        <ReviewDashboardPageControls />
      </section>
    </>
  );
}

SubmissionsToReviewPage.getLayout = function getLayout(page) {
  return (
    <>
      <AppLayout keepNavbar={false}>{page}</AppLayout>
    </>
  );
};

export default SubmissionsToReviewPage;
