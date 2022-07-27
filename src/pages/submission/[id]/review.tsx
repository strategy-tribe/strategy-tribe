import Head from 'next/head';
import { useRouter } from 'next/router';

import { useGetSubmission } from '@/lib/hooks/submissionHooks';
import { GoToBountiesPage } from '@/lib/utils/Routes';

import AppLayout from '@/components/layouts/AppLayout';
import { Review } from '@/components/pages/review/Review';

import { NextPageWithLayout } from '@/pages/_app';

const ReviewPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { id: submissionId } = router.query;

  const { submission, error } = useGetSubmission(
    submissionId as string,
    !!(submissionId as string)
  );

  if (error) {
    router.push(GoToBountiesPage());
  }

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
  return <AppLayout>{page}</AppLayout>;
};
