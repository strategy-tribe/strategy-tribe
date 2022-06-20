import Navbar from '@/components/navbar/Navbar';
import { Title } from '@/components/utils/Title';
('@/components/utils/Title');
import { SubmissionEntry } from '@/components/utils/SubmissionEntry';
import { Button, ButtonStyle } from '@/components/utils/Button';
import Loading from '@/components/utils/Loading';
import { ImportantMessage } from '@/components/utils/Warning';
import { useGetSubmissions } from '@/hooks/submissionHooks';
import { Order, SubmissionQueryParams } from '@/lib/models/queryParams';
import { SubmissionState } from '@/lib/models/status';
import type { NextPage } from 'next';
import { useAuth } from 'auth/AuthContext';

const ReviewPage: NextPage = () => {
  const query: SubmissionQueryParams = {
    order: Order.Desc,
    states: [SubmissionState.WaitingForReview],
    amount: 15,
    paginate: true,
    reviewed: false,
  };

  const { isStaff } = useAuth();

  const { submissions, error, isFetching, isLoading, hasMore, nextPage } =
    useGetSubmissions(query, isStaff);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Navbar setUp={{}} className="mx-auto max-w-5xl min-h-screen space-y-8">
      <Title
        title="Submissions to review"
        extraInfo="Submissions waiting to be reviewed"
      />
      <div className="space-y-6">
        {submissions.map((s, i) => {
          return <SubmissionEntry submission={s} key={i} />;
        })}
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
    </Navbar>
  );
};

export default ReviewPage;
