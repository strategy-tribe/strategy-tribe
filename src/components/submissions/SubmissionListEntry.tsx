import { FullSubmission } from '@/lib/types';
import { GetDateInString } from '@/lib/utils/DateHelpers';
import { GoToSubmissionPage } from '@/lib/utils/Routes';
import { useAuth } from 'auth/AuthContext';
import { useRouter } from 'next/router';
import { DelayType, NotificationType } from '../notifications/iNotification';
import { useNotification } from '../notifications/NotificationContext';
import { SubmissionStateDisplayer } from '../pages/bounty/SubmissionStatus';

export function SubmissionListEntry({
  submission,
}: {
  submission: FullSubmission;
}) {
  const router = useRouter();

  const { isAdmin, isStaff } = useAuth();

  const { notify } = useNotification();

  return (
    <div className="relative flex w-full">
      <div className="grid grid-cols-6 gap-x-4 w-[66%]">
        <div className="flex flex-col items-start col-span-4">
          <div className="flex gap-2">
            {submission.bounty?.tags?.map((tag, i) => {
              return (
                <span
                  className="capitalize label-sm text-on-surface-unactive"
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
              className="text-left title-xs group-hover:underline"
            >
              {submission.bounty?.title}
            </button>

            <div className="absolute top-0 left-0 invisible px-4 py-2 translate-x-12 -translate-y-8 rounded pointer-events-none bg-surface-dark group-hover:visible group-hover:pointer-events-auto">
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

      <div className="flex items-center gap-x-4 shrink-0 grow">
        {(isAdmin || isStaff) && (
          <button
            className="col-span-1 text-right place-self-center group grow"
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
            <span className="block title">User ID:</span>
            <span className="pt-1 group-hover:underline text-on-surface-unactive label-sm">
              {cutString(submission.authorId)}
            </span>
          </button>
        )}

        <div className="flex flex-col items-end col-span-3 place-self-center shrink-0 grow">
          {/* TODO: update MATIC */}
          {/* <span className="title">{bounty.funds} MATIC</span> */}
          <span className="pt-1 text-on-surface-unactive label-sm">
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
