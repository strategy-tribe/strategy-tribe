import { useGetBounty } from '@/lib/hooks/bountyHooks';
import { Bounty, Submission } from '@/lib/models';
import { GetDateInString } from '@/lib/utils/DateHelpers';
import { GoToSubmissionPage } from '@/lib/utils/Routes';
import { useRouter } from 'next/router';
import { SubmissionStatus } from '../pages/bounty/SubmissionStatus';

export function SubmissionListEntry({
  submission,
}: {
  submission: Submission;
}) {
  const router = useRouter();

  const { bounty, isLoading } = useGetBounty(submission.bountyId);

  if (isLoading || !bounty)
    return <div className="w-full bg-darker animate-pulse"></div>;

  return (
    <button
      key={submission.id}
      onClick={() =>
        router.push(GoToSubmissionPage(bounty.id!, submission.id!))
      }
      className="relative flex justify-between w-full items-center group"
    >
      <div className="flex flex-col items-start">
        <div className="flex gap-2">
          {bounty.tags?.map((tag) => {
            return (
              <span className="label-sm text-unactive capitalize" key={tag}>
                {tag}
              </span>
            );
          })}
        </div>

        <h5 className="title-xs group-hover:underline">{bounty.title}</h5>

        <div className="bg-darker px-4 py-2 rounded absolute left-0 top-0 group-hover:visible invisible pointer-events-none group-hover:pointer-events-auto translate-x-12 -translate-y-8">
          Go to submission
        </div>

        <p className="text-unactive">{submission.answers.at(0)?.answer}...</p>
      </div>

      <SubmissionStatus status={submission.state} />

      <div className="flex flex-col items-end">
        <span className="title">{bounty.funds} ETH</span>
        <span>{GetDateInString(submission.createdAt)} ago</span>
      </div>
    </button>
  );
}
