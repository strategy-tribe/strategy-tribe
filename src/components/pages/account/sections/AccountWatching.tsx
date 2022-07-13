import Icon, { IconSize } from '@/components/utils/Icon';
import Loading from '@/components/utils/Loading';
import {
  useIsSubscribeToAll,
  useSubscribeToAll,
} from '@/lib/hooks/subscriptionHooks';
import { TargetType } from '@/lib/models/targetType';
import { useAuth } from 'auth/AuthContext';
import { useState } from 'react';
import { SubscriptionEntry } from '../SubscriptionEntry';

export function AccountWatching() {
  const { userId, userInfo } = useAuth();
  const [view, setView] = useState<TargetType>(TargetType.Organization);
  const { isSubscribedToAll } = useIsSubscribeToAll(
    userId as string,
    Boolean(userId as string)
  );

  const { subscribeToAll, unsubscribeFromAll, isLoading, isLoadingUnsub } =
    useSubscribeToAll(userId as string, {}, {});

  if (!userInfo) return <Loading small={false} />;

  const numOfSubscriptions = userInfo?.watching?.length || 0;
  const theresMore = numOfSubscriptions > 5;
  const subsToShow = userInfo.watching?.sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  const watchingList = userInfo.watching?.filter((x) => x.type === view);

  if (!userInfo || !userId) return <></>;

  return (
    <div className="w-full space-y-8">
      <nav className="flex gap-6 items-start">
        {Object.entries(TargetType).map((pair) => {
          let label = pair[0];
          const value = pair[1];

          if (value === 'Individual') {
            label = 'Bounties';
          }

          return (
            <button
              onClick={() => setView(value)}
              key={value}
              className={`label-lg pb-2 ${
                value === view ? 'border-b-4 border-purpleDark' : ''
              }`}
            >
              {label}
            </button>
          );
        })}
      </nav>

      <div className="space-y-6">
        {!!watchingList?.length &&
          watchingList.map((subscription, i) => {
            return <SubscriptionEntry key={i} subscription={subscription} />;
          })}

        {!watchingList?.length && (
          <p className="text-disabled label">
            You are not subscribed to any push notifications
          </p>
        )}

        <div className="pt-4 border-t-2 border-darker label space-y-4">
          <div className=" text-disabled flex gap-2 items-center">
            <Icon icon="notifications" size={IconSize.Small} />
            We'll notify you of changes to organizations and bounties in your
            watching list
          </div>
          {view === TargetType.Individual && (
            <div className=" text-redLight flex gap-2 items-center">
              <Icon icon="report" size={IconSize.Small} />
              Subscriptions to bounties is in development
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
