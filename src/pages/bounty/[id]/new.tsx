import React from 'react';
import Head from 'next/head';
import { NextPageWithLayout } from '@/pages/_app';
import AppLayout from '@/components/layouts/AppLayout';
import { Requirement } from '@/lib/models/requirement';
import { EditSubmission } from '@/components/pages/submission/EditSubmission';
import { ReviewSubmission } from '@/components/pages/submission/ReviewSubmission';
import {
  NewSubmissionContextProvider,
  useNewSubmissionContext,
} from '@/components/pages/submission/NewSubmissionContext';
import { Button } from '@/components/utils/Button';

const NewSubmission: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>ST | New Submission</title>
        <meta
          name="description"
          content=" An open source project dedicated to crowdsourcing and crowdfunding
          OSINT for locating the cryptowallets of threat actors."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <>
        <NewSubmissionContextProvider>
          <Content />
        </NewSubmissionContextProvider>
      </>
    </>
  );
};

function Content() {
  const { editPhase, ctaButton } = useNewSubmissionContext();
  return (
    <>
      {editPhase && <EditSubmission />}
      {!editPhase && <ReviewSubmission />}
      {ctaButton && (
        <div className="laptop:hidden">
          <Button info={ctaButton} />
        </div>
      )}
    </>
  );
}

export default NewSubmission;
NewSubmission.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};
