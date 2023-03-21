import { useState } from 'react';

import { useGetUserServerNotifications } from '@/lib/hooks/serverNotificationHooks';
import { AccountView } from '@/lib/models/AccountView';
import { GoToAccountPage } from '@/lib/utils/Routes';

import { NotificationListEntry } from '@/components/notifications/NotificationListEntry';
import Loading from '@/components/utils/Loading';
import { Overlay } from '@/components/utils/Overlay';

import { Button, ButtonStyle } from './../../../utils/Button';
import { IconSize } from './../../../utils/Icon';
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
  const [query, setQuery] = useState<any>({
    amount: 3,
    // paginate: true,
    page: 0,
    onlyUnread: false,
    enabled: true,
  });

  const {
    notifications,
    isLoading,
    numOfPages,
    page: currPage,
    hasPreviousPage,
    hasNextPage,
  } = useGetUserServerNotifications(query, !!userId);
  // const { notifications, isLoading } = useGetUserServerNotifications(userId, {
  //   amount: 3,
  //   onlyUnread: true,
  //   enabled: true,
  // });
  return (
    <div className="relative">
      <NavbarButton icon="notifications" onClick={show} />

      {!!notifications && notifications.length > 0 && (
        <span className="absolute top-0 left-0 mt-3 ml-2 h-1.5 w-1.5 -translate-x-1 -translate-y-1 rounded-full bg-main"></span>
      )}

      {/* menu */}
      {shouldShow && (
        <aside>
          <div className="body-sm absolute top-6 right-0 z-50 flex w-96 flex-col overflow-hidden rounded-lg bg-surface-dark text-on-surface-p1">
            <header className="flex items-center justify-between px-6 py-4	">
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
                    {/* <p className="title-xs">New</p> */}
                    <div className=" place-items-top px-6 pt-2">
                      <span className="label">New</span>
                    </div>
                    {notifications.map((n, i) => {
                      return (
                        <NotificationListEntry
                          key={i}
                          notification={n}
                          hide={hide}
                          showDot={false}
                        />
                      );
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
              {/* //- RED-98 */}
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
