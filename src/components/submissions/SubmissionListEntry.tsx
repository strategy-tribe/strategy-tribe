import { useAuth } from 'auth/AuthContext';
import { useRouter } from 'next/router';

import { useGetBounty } from '@/lib/hooks/bountyHooks';
import { Submission } from '@/lib/models';
import { GetDateInString } from '@/lib/utils/DateHelpers';
import { GoToSubmissionPage } from '@/lib/utils/Routes';

import { DelayType, NotificationType } from '../notifications/iNotification';
import { useNotification } from '../notifications/NotificationContext';
import { SubmissionStatus } from '../pages/bounty/SubmissionStatus';

export function SubmissionListEntry({
  submission,
}: {
  submission: Submission;
}) {
  const router = useRouter();

  const { bounty, isLoading } = useGetBounty(submission.bountyId);

  const { isAdmin, isStaff } = useAuth();

  const { notify } = useNotification();

  if (isLoading || !bounty)
    return (
      <div className="w-full bg-surface-dark animate-pulse h-16 rounded"></div>
    );

  return (
    <div className="relative flex w-full">
      <div className="grid grid-cols-6 gap-x-4 w-[66%]">
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

          <div className="group">
            <button
              onClick={() => router.push(GoToSubmissionPage(submission.id))}
              className="title-xs group-hover:underline text-left"
            >
              {bounty.title}
            </button>

            <div className="bg-surface-dark px-4 py-2 rounded absolute left-0 top-0 group-hover:visible invisible pointer-events-none group-hover:pointer-events-auto translate-x-12 -translate-y-8">
              Go to submission
            </div>
          </div>

          <p className="text-on-surface-unactive">
            {submission.answers.at(0)?.answer}...
          </p>
        </div>

        <div className="place-self-center col-span-2">
          <SubmissionStatus status={submission.state} />
        </div>
      </div>

      <div className="flex items-center gap-x-4 shrink-0 grow">
        {(isAdmin || isStaff) && (
          <button
            className="place-self-center group text-right grow col-span-1"
            onClick={() => {
              navigator.clipboard.writeText(submission.owner);
              notify(
                { title: 'Copied', content: submission.owner },
                {
                  condition: false,
                  delayTime: 2,
                  delayType: DelayType.Time,
                  type: NotificationType.Pill,
                }
              );
            }}
          >
            <span className="block title">User ID:</span>
            <span className="group-hover:underline text-on-surface-unactive label-sm pt-1">
              {cutString(submission.owner)}
            </span>
          </button>
        )}

        <div className="place-self-center flex flex-col items-end shrink-0 grow col-span-3">
          <span className="title">{bounty.funds} MATIC</span>
          <span className="text-on-surface-unactive label-sm pt-1">
            {GetDateInString(submission.createdAt)} ago
          </span>
        </div>
      </div>
    </div>
  );
}

function cutString(address: string) {
  const firstPart = address
    .split('')
    .filter((_, i) => i < 8)
    .join()
    .replaceAll(',', '');

  const secondPart = address
    .split('')
    .filter((_, i) => i > address.split('').length - 8)
    .join()
    .replaceAll(',', '');

  const wallet = `${firstPart} ... ${secondPart}`;

  return wallet;
}
