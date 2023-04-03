import { useEffect, useState } from 'react';

import { useGetUser, useUpdateUser } from '@/lib/hooks/userHooks';
import { GetDateInString } from '@/lib/utils/DateHelpers';

import {
  DelayType,
  NotificationStyle,
  NotificationType,
} from '@/components/notifications/iNotification';
import { useNotification } from '@/components/notifications/NotificationContext';
import { Button, ButtonStyle } from '@/components/utils/Button';

import { useAuth } from '@/auth/AuthContext';

import { SubmissionDetail } from '../../submission/SubmissionDetail';
import { Stat } from '../../../utils/Stat';

export function AccountDetails() {
  const { userId, userInfo, isStaff } = useAuth();
  const { username: uName, referralCode, isLoading } = useGetUser();
  const [username, setUsername] = useState('');
  const { notify } = useNotification();
  const [dataChanged, setDataChanged] = useState(false);

  useEffect(() => {
    if (username !== uName) setDataChanged(true);
    else setDataChanged(false);
  }, [username]);

  useEffect(() => {
    setUsername(uName);
  }, [uName]);

  const { UpdateUsername } = useUpdateUser({
    onMutate: () => {
      notify(
        {
          title: 'Updating username',
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
    onSuccess: () => {
      notify(
        {
          title: 'Username updated Successfully',
          style: NotificationStyle.success,
        },
        {
          condition: false,
          delayTime: 5,
          delayType: DelayType.Time,
          type: NotificationType.Banner,
        }
      );
      setDataChanged(false);
    },
    onError: (error) => {
      notify(
        {
          title: 'Username updation Failed',
          content: `${error.message}`,
          icon: 'warning',
          style: NotificationStyle.error,
        },
        {
          condition: false,
          delayTime: 5,
          delayType: DelayType.Condition,
          type: NotificationType.Banner,
        }
      );
    },
  });

  if (!userInfo || !userId) return <></>;

  return (
    <div className="w-full space-y-6">
      {isStaff && (
        <div className="label text-on-surface-disabled">Staff account</div>
      )}

      <Stat title="User ID" content={userId as string} copyable={true} />

      <Stat
        title="Wallet"
        size="break-all"
        content={userInfo.address as string}
        copyable={true}
      />

      <div className="grid">
        <span className="label-lg capitalize text-on-surface-unactive">
          Username
        </span>
        <input
          type="text"
          placeholder={isLoading ? 'Loading...' : 'Enter username'}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mt-2 max-w-sm rounded-md bg-bg text-on-surface-p0 placeholder:text-on-surface-unactive focus:border-main-light"
        />
        {dataChanged && (
          <div className="mt-4 flex justify-start space-x-8 ">
            <Button
              info={{
                style: ButtonStyle.Filled,
                onClick: () => {
                  const confirmed = window.confirm('Update username?');
                  if (confirmed)
                    UpdateUsername({ username: username as string });
                },
                label: 'Update username',
              }}
            />
            <Button
              info={{
                style: ButtonStyle.Hollow,
                onClick: () => setUsername(uName),
                label: 'Cancel',
              }}
            />
          </div>
        )}
      </div>

      {isLoading ? (
        <SubmissionDetail label="Invite Link" value="Loading..." />
      ) : (
        <SubmissionDetail
          label="Invite Link"
          value={`${process.env.NEXT_PUBLIC_DOMAIN}?referralCode=${referralCode}`}
          copyable
        />
      )}

      <Stat
        title="Joined"
        content={`${GetDateInString(userInfo.joined)} ago`}
        copyable={false}
      />
    </div>
  );
}
