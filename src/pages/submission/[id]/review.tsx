import { Review } from '@/components/pages/review/Review';
import { useRouter } from 'next/router';
import React from 'react';
import Head from 'next/head';
import { NextPageWithLayout } from '@/pages/_app';
import AppLayout from '@/components/layouts/AppLayout';
import { useGetSubmission } from '@/lib/hooks/submissionHooks';
import ProtectedLayout from '@/components/layouts/ProtectedLayout';

const ReviewPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { id: submissionId } = router.query;

  const { submission } = useGetSubmission(
    submissionId as string,
    !!(submissionId as string)
  );

  return (
    <>
      <Head>
        <title>ST | Review</title>
        <meta
          name="description"
          content=" An open source project dedicated to crowdsourcing and crowdfunding
          OSINT for locating the cryptowallets of threat actors."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {!!submission && <Review submission={submission} />}
    </>
  );
};

export default ReviewPage;
ReviewPage.getLayout = function getLayout(page) {
  return (
    <ProtectedLayout>
      <AppLayout>{page}</AppLayout>
    </ProtectedLayout>
  );
};
