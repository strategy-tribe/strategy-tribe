import { useRouter } from 'next/router';
import React from 'react';
import Head from 'next/head';
import { NextPageWithLayout } from '@/pages/_app';
import AppLayout from '@/components/layouts/AppLayout';
import { Submission } from '@/components/pages/submission/Submission';
import { MessageForUser } from '@/components/utils/MessageForUser';
import { useGetSubmission } from '@/lib/hooks/submissionHooks';
import Loading from '@/components/utils/Loading';
import { useBanRegularUsers } from '@/lib/hooks/useBanRegularUsers';

const SubmissionPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { id: submissionId } = router.query;

  const { submission, isLoading, error } = useGetSubmission(
    submissionId as string,
    !!(submissionId as string)
  );

  useBanRegularUsers({ include: submission?.owner });

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
        {error && (
          <div className="grid place-items-center">
            <MessageForUser text={`${error}`} />
          </div>
        )}
        {isLoading && <Loading small />}

        {!!submission && <Submission submission={submission} />}
      </>
    </>
  );
};

export default SubmissionPage;
SubmissionPage.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};