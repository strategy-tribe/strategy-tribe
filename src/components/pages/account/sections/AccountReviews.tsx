import { ReviewGrade } from '@prisma/client';
import Link from 'next/link';
import { useMemo, useState } from 'react';

import { useGetReviews } from '@/lib/hooks/reviewHooks';
import { Order } from '@/lib/models/Order';
import { GoToBountyPage, GoToSubmissionPage } from '@/lib/utils/Routes';

import Dropdown, { HasLabel } from '@/components/utils/Dropdown';
import Loading from '@/components/utils/Loading';
import { PageControls } from '@/components/utils/PageControls';

import { useAuth } from '@/auth/AuthContext';
import { SmallReview } from '@/server/routes/review/getReviews';

import { SubmissionStateDisplayer } from '../../bounty/SubmissionStatus';

export function AccountReviews() {
  const { isFetchingUserInfo, userId, isAdmin } = useAuth();
  const [query, setQuery] = useState<any>({
    order: Order.Asc,
    amount: 10,
    paginate: true,
    page: 0,
  });

  const {
    reviews,
    isLoading,
    numOfPages,
    page: currPage,
    hasPreviousPage,
    hasNextPage,
  } = useGetReviews(query, isAdmin && !isFetchingUserInfo);

  const options = useMemo(() => {
    return [['All', 'All'], ...Object.entries(ReviewGrade)].map((entry) => {
      return { label: entry[1] } as HasLabel;
    });
  }, []);

  return (
    <div className="w-full space-y-6 py-2">
      <div className="flex items-center justify-between border-b-1 border-surface pb-4">
        {!isAdmin || !userId || !reviews ? (
          <span className="body-sm text-sm text-on-surface-unactive">
            Your reviews will show up here
          </span>
        ) : (
          <span className="body-sm body translate-x-0.5 text-sm  font-bold text-on-surface-unactive">
            {reviews.length} {reviews.length === 1 ? 'Review' : 'Reviews'}
          </span>
        )}
        <Dropdown
          defaultOptionIndex={0}
          labelClass="border-2 p-2 border-main rounded-md"
          options={options}
          onSelect={({ label: newState }) => {
            setQuery({
              ...query,
              grade: newState === 'All' ? undefined : (newState as ReviewGrade),
              page: 0,
            });
          }}
        />
      </div>

      <div className="space-y-4">
        <div className="label grid w-full grid-cols-8 gap-x-5 text-on-surface-unactive bt:gap-x-8">
          <p className="col-span-3">Review</p>
          <p>Grade</p>
          <p className="col-span-2">Submission</p>
          <p className="col-span-2">Bounty</p>
        </div>

        {isLoading && <Loading small />}

        {(reviews?.length ?? 0) > 0 &&
          reviews?.map((r, i) => {
            return <ReviewEntry review={r} key={i} />;
          })}
      </div>

      {(reviews?.length ?? 1) === 0 && (
        <div className="border-b-1 border-surface pb-4">
          <span className="body-sm translate-x-0.5 text-on-surface-unactive">
            You have no reviews
          </span>
        </div>
      )}

      {!isLoading && reviews && reviews.length > 0 && (
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
  );
}

function ReviewEntry({ review: r }: { review: SmallReview }) {
  return (
    <div className="body-sm grid w-full grid-cols-8 items-center gap-x-5 py-1 bt:gap-x-8">
      <p className="col-span-3 flex flex-col overflow-hidden">
        <span>{r.content}</span>
        {/* <span className="label text-on-surface-unactive">{r.grade}</span> */}
      </p>

      <p className="flex flex-col overflow-hidden">
        <SubmissionStateDisplayer status={r.grade} isSmall={true} />
      </p>

      <Link className="col-span-2" href={GoToSubmissionPage(r.submission.id)}>
        <span className="group flex flex-col overflow-hidden">
          <span className="text-main-light group-hover:text-main">
            {r.submission.id}
          </span>
          <span className="label text-on-surface-unactive">
            {r.submission.answers?.at(0)?.answer.slice(0, 20)}...
          </span>
        </span>
      </Link>

      <Link
        className="col-span-2"
        href={GoToBountyPage(r.submission.bounty?.slug as string)}
      >
        <span className="group flex flex-col overflow-hidden">
          <span className="text-main-light group-hover:text-main">
            {r.submission.bounty?.title}
          </span>
          <span className="label text-on-surface-unactive">
            {r.submission.bounty?.wallet.balance} MATIC
          </span>
        </span>
      </Link>
    </div>
  );
}
