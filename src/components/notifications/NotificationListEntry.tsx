import Link from 'next/link';

import { useReadNotification } from '@/lib/hooks/serverNotificationHooks';
import { GetDateInString } from '@/lib/utils/DateHelpers';

import { ServerNotification } from '@/components/notifications/iNotification';

export function NotificationListEntry({
  notification,
  className = '',
  showDot = false,
}: {
  notification: ServerNotification;
  className?: string;
  showDot?: boolean;
}) {
  const { mutate } = useReadNotification(notification.id);

  return (
    <Link href={notification.url}>
      <span
        className={`${
          notification.read
            ? 'bg-bg text-on-surface-unactive hover:bg-surface hover:text-on-surface-p1'
            : 'bg-surface-dark text-on-surface-p1 hover:bg-surface'
        } relative block py-5 px-6 w-full text-left rounded ${className}`}
        onClick={mutate}
      >
        {!notification.read && showDot && (
          <span className="absolute top-0 left-0 rounded-full bg-main h-2 w-2 -translate-x-1 -translate-y-1"></span>
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
