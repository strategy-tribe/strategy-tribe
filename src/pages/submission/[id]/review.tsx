import Head from 'next/head';
import { useRouter } from 'next/router';

import { useGetSubmission } from '@/lib/hooks/submission';
import { GoToBountiesPage } from '@/lib/utils/Routes';

import AppLayout from '@/components/layouts/AppLayout';
import { Review } from '@/components/pages/review/Review';
import Loading from '@/components/utils/Loading';
import { ImportantMessage } from '@/components/utils/Warning';

import { useAuth } from '@/auth/AuthContext';
import { NextPageWithLayout } from '@/pages/_app';

const ReviewPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { id: submissionId } = router.query;
  const { isAdmin, isStaff } = useAuth();

  const { submission, error, isLoading } = useGetSubmission(
    submissionId as string,
    !!(submissionId as string)
  );

  if (error) {
    router.push(GoToBountiesPage());
  }

  return (
    <>
      <Head>
        <title>Review</title>
        <meta
          name="description"
          content=" An open source project dedicated to crowdsourcing and crowdfunding
          OSINT for locating the cryptowallets of threat actors."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {isLoading && <Loading small />}
      {(isStaff || isAdmin) && !!submission && (
        <Review submission={submission} />
      )}
      {!isStaff && !isAdmin && !isLoading && (
        <ImportantMessage
          message="Unathorized"
          className="mx-auto w-full max-w-xs"
        />
      )}
    </>
  );
};

export default ReviewPage;
ReviewPage.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};
