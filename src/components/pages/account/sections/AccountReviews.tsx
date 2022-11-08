import { Review } from '@prisma/client';
import { useAuth } from 'auth/AuthContext';
import Link from 'next/link';

import { useGetReviews } from '@/lib/hooks/reviewHooks';
import { GoToSubmissionPage } from '@/lib/utils/Routes';

export function AccountReviews() {
  const { userId } = useAuth();

  const { reviews } = useGetReviews(
    {
      reviewerId: userId ?? '',
      page: 0,
      order: 'desc',
      paginate: false,
    },
    !!userId
  );

  return (
    <div className="h-fit w-full space-y-8">
      {/* Reviews */}
      <div className="space-y-4">
        <div className="label grid w-full grid-cols-3 gap-x-8 text-on-surface-unactive">
          <p>Review</p>
          <p>Submission</p>
          <p>Bounty</p>
        </div>

        {(reviews?.length ?? 0) > 0 &&
          reviews?.map((r, i) => {
            return <ReviewEntry review={r} key={i} />;
          })}
      </div>

      <div></div>

      {(reviews?.length ?? 1) === 0 && (
        <div className="border-b-1 border-surface pb-4">
          <span className="body-sm translate-x-0.5 text-on-surface-unactive">
            You have no reviews
          </span>
        </div>
      )}
    </div>
  );
}

function ReviewEntry({ review: r }: { review: Review }) {
  // const { submission: s } = useGetSubmission(r.submissionId, !!r.submissionId);
  // const { bounty: b } = useGetBounty(s?.bountyId ?? '', !!s);

  if (r.id === 'this-needs-refactoring') {
    return (
      <div className="body-sm grid w-full grid-cols-3 items-center gap-x-8 py-1">
        <p className="flex flex-col">
          <span>{r.id}</span>
          <span className="label text-on-surface-unactive">{r.grade}</span>
        </p>

        <Link href={GoToSubmissionPage('not defined')}>
          <span className="group flex flex-col">
            <span className="text-main-light group-hover:text-main">
              id of the submission goes here
            </span>
            <span className="label text-on-surface-unactive">not defined</span>
          </span>
        </Link>

        <Link href={GoToSubmissionPage('id of the bounty goes here')}>
          <span className="group flex flex-col">
            <span className="text-main-light group-hover:text-main">
              id of the bounty goes here
            </span>
            <span className="label text-on-surface-unactive">not defined</span>
          </span>
        </Link>
      </div>
    );
  } else
    return (
      <div className="h-14 w-full animate-pulse rounded-lg bg-surface-dark"></div>
    );
}
