import { Button, ButtonStyle } from '@/components/utils/Button';
import { useIsSubscribed, useSubscribe } from '@/hooks/subscriptionHooks';
import { MoreInfo } from '@/components/utils/MoreInfo';

export function SubToOrgButton({
  userId,
  orgName,
  onClick,
  useLabel = false,
  containerClass,
}: {
  onClick?: (undo: () => void) => void;
  userId?: string;
  orgName?: string;
  useLabel?: boolean;
  containerClass?: string;
}) {
  const { isLoading: isLoadingSubscriptionState, isSubscribed } =
    useIsSubscribed(
      userId as string,
      orgName as string,
      Boolean(userId as string) && Boolean(orgName as string)
    );

  const {
    subscribe,
    unsubscribe,
    isLoading: isLoadingSubs,
  } = useSubscribe(userId as string, orgName as string);

  const isLoading = isLoadingSubscriptionState || isLoadingSubs;

  function ManageClick() {
    if (isSubscribed) {
      unsubscribe();
      if (onClick) onClick(subscribe);
    } else {
      subscribe();
      if (onClick) onClick(unsubscribe);
    }
  }

  return (
    <div className={`group relative ${containerClass}`}>
      <Button
        info={{
          onClick: ManageClick,
          style: ButtonStyle.Text,
          iconClasses: isLoading ? 'animate-spin' : '',
          removeMinWidth: true,
          icon: isLoading
            ? 'sync'
            : isSubscribed
            ? 'notifications_active'
            : 'notifications',
          disabled: isLoading,
          label: useLabel
            ? isSubscribed
              ? 'Subscribed'
              : 'Subscribe'
            : undefined,
          className: 'h-fit',
        }}
      />
      <MoreInfo
        content={
          !isSubscribed
            ? "You're not subscribed to updates on this organization. Subscribe to receive push notifications."
            : "You're subscribed to updates on this organization. We will notify you of new bounties."
        }
        translate="-translate-x-20 translate-y-10 text-center"
      />
    </div>
  );
}
