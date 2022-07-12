import { GoToUserPage } from '@/lib/utils/Routes';
import { IconSize } from '../../../utils/Icon';
import Link from 'next/link';
import { Button, ButtonStyle } from '@/components/utils/Button';
import { useGetUserServerNotifications } from '@/lib/hooks/serverNotificationHooks';
import Loading from '@/components/utils/Loading';
import { Overlay } from '@/components/utils/Overlay';
import { NavbarButton } from '../NavbarButton';
import { GetDateInString } from '@/lib/utils/DateHelpers';
import { ServerNotification } from '@/components/notifications/iNotification';
import { useReadNotification } from '@/lib/hooks/useReadNotification';

export function NotifsMenu({
  userId,
  shouldShow,
  show,
  hide,
}: {
  userId: string;
  shouldShow: boolean;
  show: () => void;
  hide: () => void;
}) {
  const { notifications, isLoading } = useGetUserServerNotifications(
    userId,
    true,
    3
  );

  return (
    <div className="relative">
      <NavbarButton icon="notifications" onClick={show} />

      {/* menu */}
      {shouldShow && (
        <aside>
          <div className="bg-darker text-text rounded-lg overflow-hidden body-sm flex flex-col z-50 absolute top-6 right-0 w-96">
            <header className="flex justify-between px-6 py-4">
              <p className="title-xs">Notifications</p>

              <Button
                info={{
                  iconSize: IconSize.Small,
                  label: 'Settings',
                  icon: 'settings',
                  style: ButtonStyle.Text,
                  removeMinWidth: true,
                  removePadding: true,
                  isALink: GoToUserPage(),
                  onClick: hide,
                }}
              />
            </header>

            <hr className="w-full text-dark" />

            {!!notifications && (
              <>
                {notifications.length > 0 && (
                  <div className="">
                    {notifications.map((n, i) => {
                      return <NotificationListEntry key={i} notification={n} />;
                    })}
                  </div>
                )}

                {notifications.length === 0 && (
                  <div className="h-[10rem] grid place-items-center px-6 py-4">
                    <span className="label">You have no new notifications</span>
                  </div>
                )}
              </>
            )}

            {isLoading && <Loading small />}

            <hr className="w-full text-dark" />
            <footer className="flex justify-between px-6 py-4">
              <Button
                info={{
                  iconSize: IconSize.Small,
                  label: 'All notifications',
                  icon: 'arrow_forward',
                  style: ButtonStyle.Text,
                  removeMinWidth: true,
                  removePadding: true,
                  isALink: GoToUserPage(),
                  onClick: hide,
                }}
              />

              {!!notifications && notifications?.length > 0 && (
                <Button
                  info={{
                    label: 'Mark all as read',
                    style: ButtonStyle.Text,
                    removeMinWidth: true,
                    removePadding: true,
                    onClick: () => {
                      hide();
                      alert('to do');
                    },
                  }}
                />
              )}
            </footer>
          </div>

          <Overlay
            showOverlay={shouldShow}
            hide={hide}
            zIndex="z-40"
            opacity="opacity-30"
          />
        </aside>
      )}
    </div>
  );
}

function NotificationListEntry({
  notification,
}: {
  notification: ServerNotification;
}) {
  const { mutate } = useReadNotification(notification.id);

  return (
    <Link href={notification.url}>
      <a
        className={`${
          notification.read ? 'text-disabled' : 'hover:bg-dark text-text'
        } block py-5 px-6 w-full text-left`}
        onClick={() => mutate()}
      >
        <span>{notification.message}</span>
        <br />
        <span className="label-sm text-unactive">
          {GetDateInString(notification.createdAt)} ago
        </span>
      </a>
    </Link>
  );
}
