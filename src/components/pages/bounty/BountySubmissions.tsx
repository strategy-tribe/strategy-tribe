import Loading from '@/components/utils/Loading';
import { useGetSubmissionsFromBounty } from '@/lib/hooks/submissionHooks';
import { GetDateInString } from '@/lib/utils/DateHelpers';
import { GoToSubmissionPage } from '@/lib/utils/Routes';
import { useRouter } from 'next/router';
import { useBountyContext } from './BountyContext';
import { SubmissionStatus } from './SubmissionStatus';

export function BountySubmissions({ userId }: { userId: string | undefined }) {
  const { bounty } = useBountyContext();
  const router = useRouter();

  const { submissions, isLoading } = useGetSubmissionsFromBounty(
    userId,
    bounty.id!,
    !!userId
  );

  if (isLoading) return <Loading />;
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
      <div>
        {submissions?.map((s, i) => {
          return (
            <button
              key={s.id}
              onClick={() => router.push(GoToSubmissionPage(bounty.id!, s.id!))}
            >
              <div>
                {bounty.tags?.map((tag) => {
                  return (
                    <span className="label-sm text-unactive" key={tag}>
                      {tag}
                    </span>
                  );
                })}
              </div>

              <h5 className="title-xs">{bounty.title}</h5>

              <SubmissionStatus status={s.state} />

              <div>
                <span className="title">{bounty.funds}</span>
                <span>{GetDateInString(s.createdAt)} ago</span>
              </div>
            </button>
          );
        })}

        <div className="pt-4 border-t-[1px] border-darker text-unactive">
          Your submissions are private.
        </div>
      </div>
    </div>
  );
}
