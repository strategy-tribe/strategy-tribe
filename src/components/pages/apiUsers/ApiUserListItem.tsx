import Link from 'next/link';
import { useRouter } from 'next/router';

import { GoToApiUserPage } from '@/lib/utils/Routes';
import { toTitleCase } from '@/lib/utils/StringHelpers';

import { SmallApiUser } from '@/server/routes/apiUsers/getApiUsers';

import { DelayType, NotificationType } from '../../notifications/iNotification';
import { useNotification } from '../../notifications/NotificationContext';

export function ApiUserListItem({ apiUser }: { apiUser: SmallApiUser }) {
  const router = useRouter();

  const { notify } = useNotification();

  return (
    <div className="grid w-full items-center gap-x-4 gap-y-2 border-b-1 border-surface  pb-4 align-baseline tablet:w-full tablet:grid-cols-6">
      <div className="flex flex-col items-start tablet:col-span-1">
        <div className="group pl-4">
          <Link
            href={GoToApiUserPage(apiUser.id)}
            className="title-xs my-2 text-left text-sm font-semibold group-hover:underline"
          >
            {apiUser.name}
          </Link>

          <div className="pointer-events-none invisible absolute top-0 left-0 translate-x-12 -translate-y-8 rounded bg-surface-dark px-4 py-2 group-hover:pointer-events-auto group-hover:visible">
            Go to apiUser
          </div>
        </div>
      </div>

      <div className="place-self-start tablet:col-span-1 tablet:place-self-center">
        <div
          className={`${
            apiUser.isActive
              ? 'border-main-light text-main-light'
              : 'border-on-surface-disabled text-on-surface-disabled'
          } 
      label-sm  h-fit w-fit whitespace-nowrap rounded-full border-2 py-2 px-6 first-letter:capitalize`}
        >
          {apiUser.isActive ? 'Active' : 'Inactive'}
        </div>
      </div>

      <button
        className="group col-span-1 grow place-self-center text-right"
        onClick={() => {
          navigator.clipboard.writeText(apiUser.token);
          notify(
            { title: 'Copied', content: apiUser.token },
            {
              condition: false,
              delayTime: 2,
              delayType: DelayType.Time,
              type: NotificationType.Pill,
            }
          );
        }}
      >
        <span className="label-sm pt-1 text-on-surface-unactive group-hover:underline">
          {cutString(apiUser.token as string)}
        </span>
      </button>

      <div className="col-span-3 inline space-x-2 place-self-center">
        {apiUser.tags?.map((tag, i) => {
          return (
            <span
              className="label-sm border-r-2 border-surface pr-2 text-on-surface-unactive"
              key={i}
            >
              {toTitleCase(tag.name)}
            </span>
          );
        })}
        {apiUser.tags.length < 1 && (
          <span className="label-sm border-r-2 border-surface pr-2 text-on-surface-unactive">
            No tags added | Have access to ALL submissions
          </span>
        )}
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
