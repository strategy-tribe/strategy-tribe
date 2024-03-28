import { Rol } from '@prisma/client';
import { Dispatch, SetStateAction } from 'react';

import {
  DelayType,
  NotificationType,
} from '@/components/notifications/iNotification';
import { useNotification } from '@/components/notifications/NotificationContext';
import { cutString } from '@/components/submissions/SubmissionListEntry';

import { FullUser } from '@/server/routes/users/getUsers';

export function UserListItem({
  user,
  selectedUser,
  setSelectedUser,
}: {
  user: FullUser;
  selectedUser: FullUser | undefined;
  setSelectedUser: Dispatch<SetStateAction<FullUser | undefined>>;
}) {
  const { notify } = useNotification();

  const onUserSelect = () => {
    if (!selectedUser) {
      setSelectedUser(user);
      return;
    }
    if (selectedUser.address === user.address) {
      return;
    }
    const confirmed = window.confirm(
      'Previously Selected user is not updated. Do you still want to select this User?'
    );
    if (confirmed) {
      setSelectedUser(undefined);
      setTimeout(() => {
        setSelectedUser(user);
      });
    }
  };

  return (
    <div className="grid w-full items-center gap-x-4 gap-y-2 border-b-1 border-surface  pb-4 align-baseline tablet:w-full tablet:grid-cols-6">
      <div className="relative flex flex-col items-start tablet:col-span-1">
        <div className="group pl-4">
          <button
            className="group col-span-1 grow place-self-center break-all py-2 text-right hover:text-main"
            onClick={onUserSelect}
          >
            <span className="label-sm pt-1">{user.id}</span>
          </button>

          <div className="pointer-events-none invisible absolute top-0 left-0 translate-x-12 -translate-y-8 rounded bg-surface-dark px-4 py-2 group-hover:pointer-events-auto group-hover:visible">
            Update this User
          </div>
        </div>
      </div>

      <button
        className="group col-span-1 grow place-self-center text-right"
        onClick={() => {
          navigator.clipboard.writeText(user.address);
          notify(
            { title: 'Copied', content: user.address },
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
          {cutString(user.address as string)}
        </span>
      </button>

      <div className="place-self-start tablet:col-span-1 tablet:place-self-center">
        <div
          className={`${
            user.rol === Rol.ADMIN
              ? 'border-success text-success'
              : user.rol === Rol.STAFF
              ? 'border-main-light text-main-light'
              : user.rol === Rol.REGULAR
              ? 'border-on-surface-disabled text-on-surface-disabled'
              : 'border-waiting text-waiting'
          } 
      label-sm  h-fit w-fit whitespace-nowrap rounded-full border-2 py-2 px-6 first-letter:capitalize`}
        >
          {user.rol}
        </div>
      </div>

      <div className="col-span-1 inline space-x-2 place-self-center">
        {user.username}
      </div>
      <div className="col-span-1 inline space-x-2 place-self-center">
        {user.submissions}
      </div>
      <div className="col-span-1 inline space-x-2 place-self-center">
        {user.acceptedSubmissions}
      </div>
    </div>
  );
}
