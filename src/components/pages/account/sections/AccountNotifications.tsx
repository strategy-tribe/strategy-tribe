import { NotificationListEntry } from '@/components/notifications/NotificationListEntry';
import { Title } from '@/components/utils/Title';
import { useGetUserServerNotifications } from '@/lib/hooks/serverNotificationHooks';
import { useAuth } from 'auth/AuthContext';

export function AccountNotifications() {
  const { userId } = useAuth();

  const { notifications, isLoading } = useGetUserServerNotifications(
    userId as string,
    {
      amount: undefined,
      onlyUnread: false,
      enabled: !!(userId as string),
    }
  );

  return (
    <div className="w-full h-fit space-y-4">
      <Title title="Notifications" />

      {notifications?.map((n, i) => {
        return (
          <NotificationListEntry
            className="w-1/2"
            showDot
            key={i + n.message}
            notification={n}
          />
        );
      })}
    </div>
  );
}
