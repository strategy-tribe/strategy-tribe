import { useState } from 'react';

import { useGetSubmissions } from '@/lib/hooks/submission/useGetSubmissions';
import { Order } from '@/lib/models/Order';

import { SubmissionListEntry } from '@/components/submissions/SubmissionListEntry';
import { SubmissionPageControls } from '@/components/submissions/SubmissionPageControls';

import { useBountyContext } from './BountyContext';

export function BountySubmissions({ userId }: { userId: string | undefined }) {
  const { bounty } = useBountyContext();

  const [query, setQuery] = useState<any>({
    order: Order.Asc,
    amount: 10,
    paginate: true,
    page: 0,
  });

  const {
    submissions,
    isLoading,
    numOfPages,
    page: currPage,
    hasPreviousPage,
    hasNextPage,
  } = useGetSubmissions({
    ...query,
    bounties: [bounty.slug],
  });

  if (isLoading)
    return (
      <div className="h-[400px] w-full animate-pulse rounded bg-surface-dark" />
    );
  return (
    <div className="w-full text-on-surface-p1">
      <div className="border-b-[1px] border-surface-dark pb-4">
        {userId ? (
          <span>
            {submissions?.length}{' '}
            {submissions?.length === 1 ? 'submission' : 'submissions'}
          </span>
        ) : (
          <span>Log in to see your submissions.</span>
        )}
      </div>

      {/* Submissions */}
      <div
        className={`flex flex-col gap-8 ${submissions?.length ? 'py-6' : ''}`}
      >
        {submissions?.map((s) => {
          return <SubmissionListEntry submission={s} key={s.id} />;
        })}
        <SubmissionPageControls
          config={{
            query,
            setQuery,
            numOfPages,
            currPage,
            hasNextPage,
            hasPreviousPage,
            isLoading,
          }}
        />
      </div>

      <div className="border-t-[1px] border-surface-dark pt-4 text-on-surface-unactive">
        Your submissions are private.
      </div>
    </div>
  );
}
