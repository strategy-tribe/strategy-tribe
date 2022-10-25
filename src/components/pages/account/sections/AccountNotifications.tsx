import { useAuth } from 'auth/AuthContext';

import { useGetUserServerNotifications } from '@/lib/hooks/serverNotificationHooks';

import { NotificationListEntry } from '@/components/notifications/NotificationListEntry';

export function AccountNotifications() {
  const { userId } = useAuth();

  const { notifications } = useGetUserServerNotifications(userId as string, {
    amount: undefined,
    onlyUnread: true,
    enabled: !!(userId as string),
  });

  if (!notifications) return <>Fix useGetUserServerNotifications hook</>;

  return (
    <div className="w-full h-fit space-y-4">
      {(notifications?.length ?? 0) > 0 &&
        notifications?.map((n, i) => {
          return (
            <NotificationListEntry
              className="w-1/2"
              showDot
              key={i + n.message}
              notification={n}
            />
          );
        })}

      {(notifications?.length ?? 1) === 0 && (
        <div className="pb-4 border-b-1 border-surface">
          <span className="body-sm translate-x-0.5 text-on-surface-unactive">
            You have no notifications
          </span>
        </div>
      )}
    </div>
  );
}
