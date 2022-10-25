import { useGetUserServerNotifications } from '@/lib/hooks/serverNotificationHooks';
import { AccountView } from '@/lib/models/AccountView';
import { GoToAccountPage } from '@/lib/utils/Routes';

import { NotificationListEntry } from '@/components/notifications/NotificationListEntry';
import { Button, ButtonStyle } from '@/components/utils/Button';
import { IconSize } from '@/components/utils/Icon';
import Loading from '@/components/utils/Loading';
import { Overlay } from '@/components/utils/Overlay';

import { NavbarButton } from '../NavbarButton';

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
  const { notifications, isLoading } = useGetUserServerNotifications(userId, {
    amount: 3,
    onlyUnread: true,
    enabled: true,
  });

  return (
    <div className="relative">
      <NavbarButton icon="notifications" onClick={show} />

      {/* menu */}
      {shouldShow && (
        <aside>
          <div className="bg-surface-dark text-on-surface-p1 rounded-lg overflow-hidden body-sm flex flex-col z-50 absolute top-6 right-0 w-96">
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
                  isALink: GoToAccountPage(AccountView.Notifications),
                  onClick: hide,
                }}
              />
            </header>

            <hr className="w-full text-surface" />

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

            <hr className="w-full text-surface" />
            <footer className="flex justify-between px-6 py-4">
              <Button
                info={{
                  iconSize: IconSize.Small,
                  label: 'All notifications',
                  icon: 'arrow_forward',
                  style: ButtonStyle.Text,
                  removeMinWidth: true,
                  removePadding: true,
                  isALink: GoToAccountPage(AccountView.Notifications),
                  onClick: hide,
                }}
              />
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
