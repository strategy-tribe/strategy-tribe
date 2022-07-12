import Link from 'next/link';
import { GetDateInString } from '@/lib/utils/DateHelpers';
import { ServerNotification } from '@/components/notifications/iNotification';
import { useReadNotification } from '@/lib/hooks/useReadNotification';

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
      <a
        className={`${
          notification.read
            ? 'bg-black text-unactive hover:bg-dark hover:text-text'
            : 'bg-darker text-text hover:bg-dark'
        } relative block py-5 px-6 w-full text-left rounded ${className}`}
        onClick={mutate}
      >
        {!notification.read && showDot && (
          <span className="absolute top-0 left-0 rounded-full bg-purpleDark h-2 w-2 -translate-x-1 -translate-y-1"></span>
        )}
        <span>{notification.message}</span>
        <br />
        <span className="label-sm opacity-50">
          {GetDateInString(notification.createdAt)} ago
        </span>
      </a>
    </Link>
  );
}
