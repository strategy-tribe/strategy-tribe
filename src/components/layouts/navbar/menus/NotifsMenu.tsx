import { useGetUserServerNotifications } from '@/lib/hooks/serverNotificationHooks';

import { NotificationListEntry } from '@/components/notifications/NotificationListEntry';
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
          <div className="body-sm absolute top-6 right-0 z-50 flex w-96 flex-col overflow-hidden rounded-lg bg-surface-dark text-on-surface-p1">
            <header className="flex justify-between px-6 py-4">
              <p className="title-xs">Notifications</p>

              {/* TODO: to be implemented - RED-98
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
              /> */}
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
                  <div className="grid h-[10rem] place-items-center px-6 py-4">
                    <span className="label">You have no new notifications</span>
                  </div>
                )}
              </>
            )}

            {isLoading && <Loading small />}

            <hr className="w-full text-surface" />
            <footer className="flex justify-between px-6 py-4">
              {/* TODO: to be implemented - RED-98
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
              /> */}
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
