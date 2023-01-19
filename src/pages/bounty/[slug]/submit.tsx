import Head from 'next/head';
import { useRouter } from 'next/router';

import AppLayout from '@/components/layouts/AppLayout';
import { NewSubmission } from '@/components/pages/submission/new submission/NewSubmission';

import { NextPageWithLayout } from '@/pages/_app';

const NewSubmissionPage: NextPageWithLayout = () => {
  const router = useRouter();
  const slug = router.query.slug as string;

  return (
    <>
      <Head>
        <title>New Submission</title>
        <meta
          name="description"
          content=" An open source project dedicated to crowdsourcing and crowdfunding
          OSINT for locating the cryptowallets of threat actors."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NewSubmission bountySlug={slug} />
    </>
  );
};

export default NewSubmissionPage;
NewSubmissionPage.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};
