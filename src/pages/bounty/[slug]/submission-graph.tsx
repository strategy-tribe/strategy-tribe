import Head from 'next/head';
import { useRouter } from 'next/router';

import { useGetSubmissionGraph } from '@/lib/hooks/bountySubGraphHooks';
import { GoToBountyPage } from '@/lib/utils/Routes';

import AppLayout from '@/components/layouts/AppLayout';
import { BountySubGraphEdit } from '@/components/pages/bountySubmissionGraph/BountySubGraphEdit';
import Loading from '@/components/utils/Loading';
import { ImportantMessage } from '@/components/utils/Warning';

import { useAuth } from '@/auth/AuthContext';
import { NextPageWithLayout } from '@/pages/_app';

const ReviewPage: NextPageWithLayout = () => {
  const router = useRouter();
  const slug = router.query.slug as string;
  const { isAdmin, isStaff } = useAuth();

  const { bounty, error, isLoading } = useGetSubmissionGraph(
    slug,
    !!(slug as string)
  );

  if (error) {
    router.push(GoToBountyPage(slug));
  }

  return (
    <>
      <Head>
        <title>Submission Graph</title>
        <meta
          name="description"
          content=" An open source project dedicated to crowdsourcing and crowdfunding
          OSINT for locating the cryptowallets of threat actors."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {isLoading && <Loading small />}
      {(isStaff || isAdmin) && !!bounty && (
        <BountySubGraphEdit bounty={bounty} />
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
