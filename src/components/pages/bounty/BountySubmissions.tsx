import { SubmissionState } from '@prisma/client';
import { useMemo, useState } from 'react';

import { useGetSubmissions } from '@/lib/hooks/submission/useGetSubmissions';
import { Order } from '@/lib/models/Order';

import { SubmissionListEntry } from '@/components/submissions/SubmissionListEntry';
import Dropdown, { HasLabel } from '@/components/utils/Dropdown';
import Loading from '@/components/utils/Loading';
import { PageControls } from '@/components/utils/PageControls';

import { useAuth } from '@/auth/AuthContext';

import { useBountyContext } from './BountyContext';

export function BountySubmissions({ userId }: { userId: string | undefined }) {
  const { isAdmin, isStaff } = useAuth();
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

  const options = useMemo(() => {
    return [['All', 'All'], ...Object.entries(SubmissionState)].map((entry) => {
      return { label: entry[1] } as HasLabel;
    });
  }, []);

  return (
    <div className="w-full text-on-surface-p1">
      {!(isAdmin || isStaff) && (
        <div className="mb-4 border-b-[1px] border-surface-dark pb-2 text-on-surface-unactive">
          Your submissions are private.
        </div>
      )}
      <div className="flex items-center justify-between border-b-1 border-surface pb-4">
        {userId ? (
          <span>
            {submissions?.length}{' '}
            {submissions?.length === 1 ? 'Submission' : 'Submissions'}
          </span>
        ) : (
          <span>Log in to see your submissions.</span>
        )}
        <Dropdown
          defaultOptionIndex={0}
          labelClass="border-2 p-2 border-main rounded-md"
          options={options}
          onSelect={({ label: newState }) => {
            setQuery({
              ...query,
              state:
                newState === 'All' ? undefined : (newState as SubmissionState),
              page: 0,
            });
          }}
        />
      </div>
      {isLoading && <Loading small />}

      {/* Submissions */}
      <div
        className={`flex flex-col gap-8 ${submissions?.length ? 'py-6' : ''}`}
      >
        {submissions?.map((s) => {
          return <SubmissionListEntry submission={s} key={s.id} />;
        })}

        {!isLoading && submissions && submissions.length > 0 && (
          <PageControls
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
        )}
      </div>
    </div>
  );
}
