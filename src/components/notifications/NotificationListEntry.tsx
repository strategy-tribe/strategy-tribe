import Link from 'next/link';

import { useReadNotification } from '@/lib/hooks/serverNotificationHooks';
import { GetDateInString } from '@/lib/utils/DateHelpers';

import { ServerNotification } from '@/components/notifications/iNotification';

export function NotificationListEntry({
  notification,
  className = '',
  showDot,
  hide,
}: {
  notification: ServerNotification;
  className?: string;
  showDot?: boolean;
  hide: () => void;
}) {
  const { ReadNotification } = useReadNotification();
  return (
    <Link href={`${notification.urlCallback}`}>
      <span
        className={`${
          notification.read
            ? 'bg-bg text-on-surface-unactive hover:bg-surface hover:text-on-surface-p1'
            : 'bg-surface-dark text-on-surface-p1 hover:bg-surface'
        } relative block w-full rounded py-5 px-6 text-left ${className}`}
        onClick={(e) => {
          ReadNotification({ id: notification.id });
          hide();
        }}
      >
        {!notification.read && showDot && (
          <span className="absolute top-0 left-0 h-2 w-2 -translate-x-1 -translate-y-1 rounded-full bg-main"></span>
        )}
        <span>{notification.message}</span>
        <br />
        <span className="label-sm opacity-50">
          {GetDateInString(notification.createdAt)} ago
        </span>
      </span>
    </Link>
  );
}
