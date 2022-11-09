import Head from 'next/head';
import { useRouter } from 'next/router';

import AppLayout from '@/components/layouts/AppLayout';
import { NewSubmission } from '@/components/pages/submission/new submission/NewSubmission';

import { NextPageWithLayout } from '@/pages/_app';

const NewSubmissionPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { id: bountyId } = router.query;

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
        {!!(bountyId as string) && (
          <NewSubmission bountyId={bountyId as string} />
        )}
      </>
    </>
  );
};

export default NewSubmissionPage;
NewSubmissionPage.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};
