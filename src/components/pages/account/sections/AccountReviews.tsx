import { useAuth } from 'auth/AuthContext';
import Link from 'next/link';

import { useGetBounty } from '@/lib/hooks/bountyHooks';
import { useGetReviews } from '@/lib/hooks/reviewHooks';
import { useGetSubmission } from '@/lib/hooks/submissionHooks';
import { Review } from '@/lib/models/Review';
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
    <div className="w-full h-fit space-y-8">
      {/* Reviews */}
      <div className="space-y-4">
        <div className="grid grid-cols-3 w-full gap-x-8 label text-on-surface-unactive">
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
        <div className="pb-4 border-b-1 border-surface">
          <span className="body-sm translate-x-0.5 text-on-surface-unactive">
            You have no reviews
          </span>
        </div>
      )}
    </div>
  );
}

function ReviewEntry({ review: r }: { review: Review }) {
  const { submission: s } = useGetSubmission(r.submissionId, !!r.submissionId);
  const { bounty: b } = useGetBounty(s?.bountyId ?? '', !!s);

  if (b && s) {
    return (
      <div className="grid grid-cols-3 w-full gap-x-8 body-sm items-center py-1">
        <p className="flex flex-col">
          <span>{r.id}</span>
          <span className="label text-on-surface-unactive">{r.grade}</span>
        </p>

        <Link href={GoToSubmissionPage(s.id)}>
          <a className="flex flex-col group">
            <span className="text-main-light group-hover:text-main">
              {s.id}
            </span>
            <span className="label text-on-surface-unactive">{s.state}</span>
          </a>
        </Link>

        <Link href={GoToSubmissionPage(b.id)}>
          <a className="flex flex-col group">
            <span className="text-main-light group-hover:text-main">
              {b.id}
            </span>
            <span className="label text-on-surface-unactive">{b.state}</span>
          </a>
        </Link>
      </div>
    );
  } else
    return (
      <div className="h-14 w-full bg-surface-dark animate-pulse rounded-lg"></div>
    );
}
