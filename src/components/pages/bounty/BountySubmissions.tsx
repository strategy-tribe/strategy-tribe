import Loading from '@/components/utils/Loading';
import { MoreInfo } from '@/components/utils/MoreInfo';
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

      {/* Submissions */}
      <div className="py-8">
        {submissions?.map((s, i) => {
          return (
            <button
              key={s.id}
              onClick={() => router.push(GoToSubmissionPage(bounty.id!, s.id!))}
              className="relative flex justify-between w-full items-center group"
            >
              <div className="flex flex-col items-start">
                <div className="flex gap-2">
                  {bounty.tags?.map((tag) => {
                    return (
                      <span
                        className="label-sm text-unactive capitalize"
                        key={tag}
                      >
                        {tag}
                      </span>
                    );
                  })}
                </div>

                <h5 className="title-xs group-hover:underline">
                  {bounty.title}
                </h5>

                <div className="bg-darker px-4 py-2 rounded absolute left-0 top-0 group-hover:visible invisible pointer-events-none group-hover:pointer-events-auto translate-x-12 -translate-y-8">
                  Go to submission
                </div>

                <p className="text-unactive">{s.answers.at(0)?.answer}...</p>
              </div>

              <SubmissionStatus status={s.state} />

              <div className="flex flex-col items-end">
                <span className="title">{bounty.funds} ETH</span>
                <span>{GetDateInString(s.createdAt)} ago</span>
              </div>
            </button>
          );
        })}
      </div>

      <div className="pt-4 border-t-[1px] border-darker text-unactive">
        Your submissions are private.
      </div>
    </div>
  );
}
