import { useAuth } from 'auth/AuthContext';
import { useRouter } from 'next/router';
import React from 'react';
import Head from 'next/head';
import { NextPageWithLayout } from '@/pages/_app';
import AppLayout from '@/components/layouts/AppLayout';
import { SubmissionDetails } from '@/components/pages/submission/SubmissionDetails';

const SubmissionPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { id: bountyId, submissionId } = router.query;

  return (
    <>
      <Head>
        <title>ST | Submission</title>
        <meta
          name="description"
          content=" An open source project dedicated to crowdsourcing and crowdfunding
          OSINT for locating the cryptowallets of threat actors."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <>
        <SubmissionDetails
          bountyId={bountyId as string}
          submissionId={submissionId as string}
        />
      </>
    </>
  );
};

export default SubmissionPage;
SubmissionPage.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};
