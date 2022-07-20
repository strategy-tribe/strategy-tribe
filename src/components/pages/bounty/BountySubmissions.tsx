import Loading from '@/components/utils/Loading';
import { MoreInfo } from '@/components/utils/MoreInfo';
import { useGetSubmissionsFromBounty } from '@/lib/hooks/submissionHooks';
import { useBountyContext } from './BountyContext';
import { SubmissionListEntry } from '../../submissions/SubmissionListEntry';

export function BountySubmissions({ userId }: { userId: string | undefined }) {
  const { bounty } = useBountyContext();

  const { submissions, isLoading } = useGetSubmissionsFromBounty(
    userId,
    bounty.id!,
    !!userId
  );

  if (isLoading) return <Loading small />;
  return (
    <div className="text-text w-full">
      <div className="pb-4 border-b-[1px] border-darker">
        {!!userId ? (
          <span>
            {submissions?.length}{' '}
            {submissions?.length === 1 ? 'submission' : 'submissions'}
          </span>
        ) : (
          <span>Log in to see your submissions.</span>
        )}
      </div>

      {/* Submissions */}
      <div className={submissions?.length ? 'py-8' : ''}>
        {submissions?.map((s) => {
          return <SubmissionListEntry submission={s} key={s.id} />;
        })}
      </div>

      <div className="pt-4 border-t-[1px] border-darker text-unactive">
        Your submissions are private.
      </div>
    </div>
  );
}
