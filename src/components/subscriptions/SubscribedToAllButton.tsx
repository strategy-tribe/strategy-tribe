import {
  DelayType,
  NotificationStyle,
  NotificationType,
} from '@/components/notifications/iNotification';
import { useNotification } from '@/components/notifications/NotificationContext';
import {
  Button,
  ButtonInformation,
  ButtonStyle,
} from '@/components/utils/Button';
import { useSubscribeToAll } from '@/hooks/subscriptionHooks';
import { info } from 'console';
import React from 'react';
import { useAuth } from 'auth/AuthContext';

export function SubscribedToAllButton({ info }: { info: ButtonInformation }) {
  const { notify } = useNotification();
  const { userId } = useAuth();
  const { isLoading: isSubscribing, subscribeToAll } = useSubscribeToAll(
    userId as string,
    {
      onError: (err) =>
        notify(
          {
            title: 'There has been an error',
            content: err as string,
            style: NotificationStyle.error,
          },
          {
            condition: false,
            delayTime: 3,
            delayType: DelayType.Time,
            type: NotificationType.Banner,
          }
        ),
      onSuccess: () =>
        notify(
          {
            title: 'Success',
            content: "We'll notify of new bounties",
            style: NotificationStyle.success,
          },
          {
            condition: false,
            delayTime: 3,
            delayType: DelayType.Time,
            type: NotificationType.Banner,
          }
        ),
    }
  );

  return (
    <Button
      info={{
        ...info,
        onClick: subscribeToAll,
        icon: isSubscribing ? 'refresh' : 'notifications',
        iconClasses: isSubscribing ? 'animate-spin' : '',
        disabled: isSubscribing,
      }}
    />
  );
}
