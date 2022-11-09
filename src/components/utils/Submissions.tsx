import { SubmissionState } from '@prisma/client';
import { useMemo, useState } from 'react';

import { useGetSubmissions } from '@/lib/hooks/submission/useGetSubmissions';
import { Order } from '@/lib/models/Order';

import Loading from '@/components/utils/Loading';

import { SubmissionEntry } from './SubmissionEntry';
import { Title } from './Title';

('@/components/utils/Title');

function Submissions({ bountyId }: { bountyId: string }) {
  const { submissions, isLoading } = useGetSubmissions({
    bounties: [bountyId],
    order: Order.Asc,
  });
  const [showAll, setShowAll] = useState(false);

  // const filteredSubmissions = useMemo(() => {
  //   if (!submissions) return [];
  //   return submissions.sort((a, b) => {
  //     if (order === 'asc') return a.createdAt.getTime() - b.createdAt.getTime();
  //     else return b.createdAt.getTime() - a.createdAt.getTime();
  //   });
  // }, [order, submissions]);

  const waitingForReview = useMemo(() => {
    if (!submissions || submissions.length < 1) return [];
    return submissions?.filter(
      (s) => s.state === SubmissionState.WaitingForReview
    );
  }, [submissions]);

  if (isLoading) return <Loading small={false} />;
  return (
    <div className="space-y-4 pb-32">
      {/* Title */}
      <Title title="Submissions" />
      {/* Filters */}
      <div className="flex items-center justify-between">
        {/* pick states of submissions */}
        <div className="flex items-center space-x-6 text-on-surface-unactive">
          <button
            className={`label hover:text-on-surface-p0 ${
              !showAll && 'text-on-surface-p0'
            }`}
            onClick={() => setShowAll(false)}
          >
            {waitingForReview && <p> To Review ({waitingForReview?.length})</p>}
            {!waitingForReview && <span> To Review (...)</span>}
          </button>
          <button
            className={`label hover:text-on-surface-p0 ${
              showAll && 'text-on-surface-p0'
            }`}
            onClick={() => setShowAll(true)}
          >
            {submissions && <span>All ({submissions?.length})</span>}
            {!submissions && <span>All (...)</span>}
          </button>
        </div>
      </div>
      {submissions && submissions.length < 1 && (
        <div className="">
          <span className="text-on-surface-disabled">0 submissions</span>
        </div>
      )}
      Submissions
      {waitingForReview && (
        <div className="space-y-4 pt-2">
          {/* {showAll &&
            filteredSubmissions.map((s, i) => {
              return <SubmissionEntry key={i} submission={s} />;
            })} */}
          {!showAll &&
            waitingForReview.map((s, i) => {
              return <SubmissionEntry key={i} submission={s} />;
            })}
        </div>
      )}
    </div>
  );
}

export default Submissions;
