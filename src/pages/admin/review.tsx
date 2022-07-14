import { Title } from '@/components/utils/Title';
('@/components/utils/Title');
import { Button, ButtonStyle } from '@/components/utils/Button';
import Loading from '@/components/utils/Loading';
import { ImportantMessage } from '@/components/utils/Warning';
import { useGetSubmissions } from '@/hooks/submissionHooks';
import { Order } from '@/lib/models/queries/Order';
import { SubmissionQueryParams } from '@/lib/models/queries/SubmissionQueryParams';
import { SubmissionState } from '@/lib/models/status';
import AppLayout from '@/components/layouts/AppLayout';
import { NextPageWithLayout } from '../_app';
import { SubmissionListEntry } from '@/components/submissions/SubmissionListEntry';
import Head from 'next/head';
import ProtectedLayout from '@/components/layouts/ProtectedLayout';

const SubmissionsToReviewPage: NextPageWithLayout = () => {
  const query: SubmissionQueryParams = {
    order: Order.Desc,
    states: [SubmissionState.WaitingForReview],
    amount: 15,
    paginate: false,
    reviewed: false,
  };

  const { submissions, error, isFetching, isLoading, hasMore, nextPage } =
    useGetSubmissions(query);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Head>
        <title>ST | Reviewing</title>
        <meta
          name="description"
          content="StrategyTribe was born from a need for higher quality, better scaled OSINT work on the
          world's most important threat actors. We aim to centralize, organize
          and incentivise the collection of widely important data by
          individuals."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="mx-auto max-w-5xl min-h-screen space-y-8">
        <Title
          title="Submissions to review"
          extraInfo="Submissions waiting to be reviewed"
        />
        <div className="space-y-10">
          <>
            {submissions.length > 0 &&
              submissions.map((s, i) => {
                return <SubmissionListEntry submission={s} key={i} />;
              })}
          </>

          <>
            {submissions.length === 0 && (
              <div className="label text-unactive py-4 border-y-2 px-4 border-dark">
                No submissions to review
              </div>
            )}
          </>
        </div>

        {submissions && hasMore && (
          <Button
            info={{
              onClick: nextPage,
              label: 'More',
              icon: 'autorefresh',
              style: ButtonStyle.Filled,
              disabled: isFetching || isLoading,
            }}
          />
        )}

        {!!error && !isLoading && (
          <ImportantMessage
            message="There was an error."
            content={error as string}
            icon="warning"
          />
        )}
      </div>
    </>
  );
};

SubmissionsToReviewPage.getLayout = function getLayout(page) {
  return (
    <ProtectedLayout>
      <AppLayout>{page}</AppLayout>
    </ProtectedLayout>
  );
};
export default SubmissionsToReviewPage;
