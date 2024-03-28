import { Rol } from '@prisma/client';
import { Dispatch, SetStateAction, useMemo, useState } from 'react';

import { useUpdateUserRole } from '@/lib/hooks/userHooks';

import {
  DelayType,
  NotificationStyle,
  NotificationType,
} from '@/components/notifications/iNotification';
import { useNotification } from '@/components/notifications/NotificationContext';
import { Button, ButtonStyle } from '@/components/utils/Button';
import Dropdown, { HasLabel } from '@/components/utils/Dropdown';
import { Title } from '@/components/utils/Title';

import { FullUser } from '@/server/routes/users/getUsers';

export function UserEdit({
  user,
  setUser,
  onUpdate,
}: {
  user: FullUser;
  setUser: Dispatch<SetStateAction<FullUser | undefined>>;
  onUpdate: () => void;
}) {
  const { notify: notify } = useNotification();
  const [selectedRole, setSelectedRole] = useState(user.rol);
  const options = useMemo(() => {
    return [...Object.entries(Rol)].map((entry) => {
      return { label: entry[1] } as HasLabel;
    });
  }, []);

  const { UpdateUserRole } = useUpdateUserRole({
    onMutate: () => {
      notify(
        {
          title: 'Updating User Role',
          content: 'Please do not close this window',
          icon: 'warning',
        },
        {
          delayTime: 0,
          delayType: DelayType.Condition,
          condition: false,
          type: NotificationType.Banner,
        }
      );
    },
    onSuccess: (user) => {
      notify(
        {
          title: `Role Updated to: ${user.rol}`,
          content: `User: ${user.id}  || Address: ${user.address}`,
          style: NotificationStyle.success,
        },
        {
          condition: false,
          delayTime: 10,
          delayType: DelayType.Time,
          type: NotificationType.Banner,
        }
      );
      onUpdate();
    },
    onError: (error) => {
      notify(
        {
          title: 'There was an issue updating Role',
          content: error.message,
          icon: 'warning',
          style: NotificationStyle.error,
        },
        {
          condition: false,
          delayTime: 10,
          delayType: DelayType.Time,
          type: NotificationType.Banner,
        }
      );
    },
  });

  return (
    <div className="mx-auto mb-2 max-w-5xl space-y-8 rounded-lg border-4 border-surface p-4">
      <div className="flex items-center justify-between border-b-1 border-main pb-4">
        <Title title="Update Selected User" useBorder={false} big={true} />

        <div className="flex items-center space-x-4">
          <Button
            info={{
              style: ButtonStyle.Hollow,
              label: 'Cancel',
              onClick: () => setUser(undefined),
            }}
          />

          <Button
            info={{
              style: ButtonStyle.Filled,
              label: 'Save',
              disabled: user.rol === selectedRole,
              onClick: () =>
                UpdateUserRole({ address: user.address, role: selectedRole }),
            }}
          />
        </div>
      </div>

      <div className="grid gap-x-4 gap-y-2 align-baseline tablet:w-full tablet:grid-cols-3">
        <div className="flex flex-col items-start tablet:col-span-1">
          <span>User Id:</span>
          <button
            className="group place-self-start"
            onClick={() => {
              navigator.clipboard.writeText(user.id);
              notify(
                { title: 'Copied', content: user.id },
                {
                  condition: false,
                  delayTime: 2,
                  delayType: DelayType.Time,
                  type: NotificationType.Pill,
                }
              );
            }}
          >
            <span className="label-sm pt-1 text-sm text-on-surface-unactive group-hover:underline">
              {user.id}
            </span>
          </button>{' '}
        </div>
        <div className="flex flex-col items-start tablet:col-span-1">
          <span>Address:</span>
          <button
            className="group place-self-start"
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
            <span className="label-sm pt-1 text-sm text-on-surface-unactive group-hover:underline">
              {user.address}
            </span>
          </button>
        </div>
        <div className="flex flex-col items-center tablet:col-span-1">
          <span>Username:</span>{' '}
          <span className="break-all">{user.username ?? '--'}</span>
        </div>
      </div>

      <div className="mx-auto flex w-full items-center justify-center space-x-8">
        <span className="text-base font-semibold">Change User Role:</span>
        <Dropdown
          defaultOptionIndex={options.findIndex((o) => o.label === user.rol)}
          labelClass="border-2 p-2 border-main rounded-md"
          options={options}
          onSelect={({ label: newState }) => setSelectedRole(newState as Rol)}
        />
      </div>
    </div>
  );
}
