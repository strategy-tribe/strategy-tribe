import { useGetSubmissions } from '@/lib/hooks/submissionHooks';

import { SubmissionListEntry } from '@/components/submissions/SubmissionListEntry';
import Loading from '@/components/utils/Loading';

import { useBountyContext } from './BountyContext';

export function BountySubmissions({ userId }: { userId: string | undefined }) {
  const { bounty } = useBountyContext();

  const { submissions, isLoading } = useGetSubmissions({
    bounties: [bounty.id],
  });

  if (isLoading) return <Loading small />;
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
      </div>

      <div className="border-t-[1px] border-surface-dark pt-4 text-on-surface-unactive">
        Your submissions are private.
      </div>
    </div>
  );
}
