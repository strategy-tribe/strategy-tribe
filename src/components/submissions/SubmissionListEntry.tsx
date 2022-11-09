import { useRouter } from 'next/router';

import { GetDateInString } from '@/lib/utils/DateHelpers';
import { GoToSubmissionPage } from '@/lib/utils/Routes';

import { useAuth } from '@/auth/AuthContext';
import { SmallSubmission } from '@/server/routes/submission/getSubmissions';

import { DelayType, NotificationType } from '../notifications/iNotification';
import { useNotification } from '../notifications/NotificationContext';
import { SubmissionStateDisplayer } from '../pages/bounty/SubmissionStatus';

export function SubmissionListEntry({
  submission,
}: {
  submission: SmallSubmission;
}) {
  const router = useRouter();

  const { isAdmin, isStaff } = useAuth();

  const { notify } = useNotification();

  return (
    <div className="relative flex w-full">
      <div className="grid w-[66%] grid-cols-6 gap-x-4">
        <div className="col-span-4 flex flex-col items-start">
          <div className="flex gap-2">
            {submission.bounty?.tags?.map((tag, i) => {
              return (
                <span
                  className="label-sm capitalize text-on-surface-unactive"
                  key={i}
                >
                  {tag.name}
                </span>
              );
            })}
          </div>

          <div className="group">
            <button
              onClick={() => router.push(GoToSubmissionPage(submission.id))}
              className="title-xs text-left group-hover:underline"
            >
              {submission.bounty?.title}
            </button>

            <div className="pointer-events-none invisible absolute top-0 left-0 translate-x-12 -translate-y-8 rounded bg-surface-dark px-4 py-2 group-hover:pointer-events-auto group-hover:visible">
              Go to submission
            </div>
          </div>

          <p className="text-on-surface-unactive">
            {submission.answers?.at(0)?.answer}...
          </p>
        </div>

        <div className="col-span-2 place-self-center">
          <SubmissionStateDisplayer status={submission.state} />
        </div>
      </div>

      <div className="flex shrink-0 grow items-center gap-x-4">
        {(isAdmin || isStaff) && (
          <button
            className="group col-span-1 grow place-self-center text-right"
            onClick={() => {
              navigator.clipboard.writeText(submission.authorId);
              notify(
                { title: 'Copied', content: submission.authorId },
                {
                  condition: false,
                  delayTime: 2,
                  delayType: DelayType.Time,
                  type: NotificationType.Pill,
                }
              );
            }}
          >
            <span className="title block">User ID:</span>
            <span className="label-sm pt-1 text-on-surface-unactive group-hover:underline">
              {cutString(submission.authorId)}
            </span>
          </button>
        )}

        <div className="col-span-3 flex shrink-0 grow flex-col items-end place-self-center">
          {/* TODO: update MATIC */}
          {/* <span className="title">{bounty.funds} MATIC</span> */}
          <span className="label-sm pt-1 text-on-surface-unactive">
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
