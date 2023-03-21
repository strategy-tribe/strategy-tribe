import Link from 'next/link';

import { useReadNotification } from '@/lib/hooks/serverNotificationHooks';
import { GetDateInString } from '@/lib/utils/DateHelpers';
export function NotificationListEntry({
  notification,
  className = '',
  showDot,
  hide,
}: {
  notification: any;
  className?: string;
  showDot?: boolean;
  hide: () => void;
}) {
  const { Pay } = useReadNotification({
    onMutate: () => {
      // console.log('mutate');
    },
    onSuccess: () => {
      // console.log('success');
    },
    onError: (error) => {
      // console.log('error');
    },
  });
  return (
    <Link href={`${notification.urlCallback}`}>
      <span
        className={`${
          notification.read
            ? 'bg-bg text-on-surface-unactive hover:bg-surface hover:text-on-surface-p1'
            : 'bg-surface-dark text-on-surface-p1 hover:bg-surface'
        } relative block w-full rounded py-5 px-6 text-left ${className}`}
        onClick={(e) => {
          Pay({ id: notification.id });
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
