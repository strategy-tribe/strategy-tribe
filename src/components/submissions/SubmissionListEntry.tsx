import { useRouter } from 'next/router';

import { useGetBounty } from '@/lib/hooks/bountyHooks';
import { Submission } from '@/lib/models';
import { GetDateInString } from '@/lib/utils/DateHelpers';
import { GoToSubmissionPage } from '@/lib/utils/Routes';

import { SubmissionStatus } from '../pages/bounty/SubmissionStatus';

export function SubmissionListEntry({
  submission,
}: {
  submission: Submission;
}) {
  const router = useRouter();

  const { bounty, isLoading } = useGetBounty(submission.bountyId);

  if (isLoading || !bounty)
    return (
      <div className="w-full bg-surface-dark animate-pulse h-16 rounded"></div>
    );

  return (
    <button
      key={submission.id}
      onClick={() => router.push(GoToSubmissionPage(submission.id))}
      className="relative w-full group grid grid-cols-6 gap-x-8"
    >
      <div className="flex flex-col items-start col-span-4">
        <div className="flex gap-2">
          {bounty.tags?.map((tag) => {
            return (
              <span
                className="label-sm text-on-surface-unactive capitalize"
                key={tag}
              >
                {tag}
              </span>
            );
          })}
        </div>

        <h5 className="title-xs group-hover:underline text-left">
          {bounty.title}
        </h5>

        <div className="bg-surface-dark px-4 py-2 rounded absolute left-0 top-0 group-hover:visible invisible pointer-events-none group-hover:pointer-events-auto translate-x-12 -translate-y-8">
          Go to submission
        </div>

        <p className="text-on-surface-unactive">
          {submission.answers.at(0)?.answer}...
        </p>
      </div>

      <div className="place-self-center">
        <SubmissionStatus status={submission.state} />
      </div>

      <div className="flex flex-col items-end">
        <span className="title">{bounty.funds} MATIC</span>
        <span className="text-on-surface-unactive label-sm pt-1">
          {GetDateInString(submission.createdAt)} ago
        </span>
      </div>
    </button>
  );
}
