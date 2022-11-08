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
    <div className="text-on-surface-p1 w-full">
      <div className="pb-4 border-b-[1px] border-surface-dark">
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

      <div className="pt-4 border-t-[1px] border-surface-dark text-on-surface-unactive">
        Your submissions are private.
      </div>
    </div>
  );
}
