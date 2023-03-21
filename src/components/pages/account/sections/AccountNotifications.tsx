import { useState } from 'react';

import { useGetUserServerNotifications } from '@/lib/hooks/serverNotificationHooks';

import { NotificationListEntry } from '@/components/notifications/NotificationListEntry';
import Loading from '@/components/utils/Loading';
import { PageControls } from '@/components/utils/PageControls';

import { useAuth } from '@/auth/AuthContext';
export function AccountNotifications() {
  const { userId } = useAuth();
  const [query, setQuery] = useState<any>({
    amount: 10,
    paginate: true,
    page: 0,
    // onlyUnread: true,
  });

  const {
    notifications,
    isLoading,
    numOfPages,
    page: currPage,
    hasPreviousPage,
    hasNextPage,
  } = useGetUserServerNotifications(query, !!userId);
  return (
    <div className="h-fit w-full space-y-4">
      {(notifications?.length ?? 0) > 0 &&
        notifications?.map((n, i) => {
          return (
            <NotificationListEntry
              className="mb-0 w-full"
              hide={() => {
                // console.log('hide')
              }}
              key={i + n.message}
              notification={n}
              showDot={true}
            />
          );
        })}
      {isLoading && <Loading small />}

      {!isLoading && notifications && notifications.length > 0 && (
        <PageControls
          config={{
            query,
            setQuery,
            numOfPages,
            currPage,
            hasNextPage,
            hasPreviousPage,
            isLoading,
          }}
        />
      )}
      {(notifications?.length ?? 1) === 0 && (
        <div className="border-b-1 border-surface pb-4">
          <span className="body-sm translate-x-0.5 text-on-surface-unactive">
            You have no notifications
          </span>
        </div>
      )}
    </div>
  );
}
