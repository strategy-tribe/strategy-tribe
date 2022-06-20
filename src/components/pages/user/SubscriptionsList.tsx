import { Title } from '@/components/utils/Title';
('@/components/utils/Title');
import { Button, ButtonStyle } from '@/components/utils/Button';
import Loading from '@/components/utils/Loading';
import { useAuth } from 'auth/AuthContext';
import {
  useIsSubscribeToAll,
  useSubscribeToAll,
} from '@/hooks/subscriptionHooks';
import { GoToSubsPage } from '@/utils/Routes';
import { SubscriptionEntry } from './SubscriptionEntry';
import { AppearVariants } from '@/lib/framer/Variants';

export function SubscriptionsList({ showAll = false }: { showAll?: boolean }) {
  const { userId, userInfo } = useAuth();
  const { isSubscribedToAll } = useIsSubscribeToAll(
    userId as string,
    Boolean(userId as string)
  );

  const { subscribeToAll, unsubscribeFromAll, isLoading, isLoadingUnsub } =
    useSubscribeToAll(userId as string, {}, {});

  if (!userInfo) return <Loading fullScreen={false} />;

  const numOfSubscriptions = userInfo?.subscribedTo?.length;
  const theresMore = numOfSubscriptions > 5;
  const subsToShow = showAll
    ? userInfo.subscribedTo.sort((a, b) => a.localeCompare(b))
    : userInfo.subscribedTo.sort((a, b) => a.localeCompare(b)).slice(0, 5);

  return (
    <div className="space-y-4 pb-16 max-w-3xl">
      <div className="w-full flex justify-between items-center">
        <Title title={`Push notifications (${numOfSubscriptions})`} />
        {
          <div className="flex gap-6 items-center pb-4">
            {/* Link to all subscriptions */}
            {theresMore && !showAll && (
              <Button
                info={{
                  label: `See all  (${userInfo.subscribedTo.length})`,
                  style: ButtonStyle.TextPurple,
                  removeMinWidth: true,
                  removePadding: true,
                  className: 'w-fit',
                  isALink: GoToSubsPage(),
                }}
              />
            )}

            {showAll && !isSubscribedToAll && (
              <Button
                info={{
                  label: isLoading ? 'Subscribing...' : `Subscribe to all`,
                  style: ButtonStyle.Text,
                  removeMinWidth: true,
                  removePadding: true,
                  className: 'w-fit',
                  onClick: subscribeToAll,
                  icon: isLoading ? 'refresh' : 'notifications',
                  iconClasses: isLoading ? 'animate-spin' : undefined,
                  disabled: isLoading || isLoadingUnsub,
                }}
              />
            )}
            {showAll && numOfSubscriptions > 0 && (
              <Button
                info={{
                  label: isLoadingUnsub
                    ? 'Unsubscribing...'
                    : `Unsubscribe from all`,
                  style: ButtonStyle.Text,
                  removeMinWidth: true,
                  removePadding: true,
                  className: 'w-fit',
                  onClick: unsubscribeFromAll,
                  icon: isLoadingUnsub ? 'refresh' : 'notifications_off',
                  iconClasses: isLoadingUnsub ? 'animate-spin' : undefined,
                  disabled: isLoading || isLoadingUnsub,
                }}
              />
            )}
          </div>
        }
      </div>

      {!!userInfo.subscribedTo.length &&
        subsToShow.map((s, i) => {
          return (
            <SubscriptionEntry key={i} orgName={s} variants={AppearVariants} />
          );
        })}

      {!userInfo.subscribedTo.length && (
        <p className="text-disabled label">
          You are not subscribed to any push notifications
        </p>
      )}
    </div>
  );
}
