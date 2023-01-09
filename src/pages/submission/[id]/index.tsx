import Head from 'next/head';
import { useRouter } from 'next/router';

import { useGetSubmission } from '@/lib/hooks/submission';

import AppLayout from '@/components/layouts/AppLayout';
import { Submission } from '@/components/pages/submission/Submission';
import Loading from '@/components/utils/Loading';
import { MessageForUser } from '@/components/utils/MessageForUser';

import { NextPageWithLayout } from '@/pages/_app';

const SubmissionPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { id: submissionId } = router.query;

  const { submission, isLoading, error } = useGetSubmission(
    submissionId as string,
    !!(submissionId as string)
  );

  return (
    <>
      <Head>
        <title>Submission</title>
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
