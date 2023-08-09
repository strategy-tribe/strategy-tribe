import {
  useIsSubscribedBounties,
  useSubscribeBounty,
  useUnSubscribeBounties,
} from '@/lib/hooks/subscriptionHooks';

import {
  Button,
  ButtonInformation,
  ButtonStyle,
} from '@/components/utils/Button';

import { useAuth } from '@/auth/AuthContext';

import { DelayType, NotificationType } from '../notifications/iNotification';
import { useNotification } from '../notifications/NotificationContext';

export function SubToBountyButton({
  bountySlug,
  button,
  useLabel = true,
  refetchSubscribedBounties,
  isAccountPage,
}: {
  bountySlug: string;
  useLabel?: boolean;
  button: (isLoading: boolean, isSubscribed: boolean) => ButtonInformation;
  refetchSubscribedBounties: () => void;
  isAccountPage: boolean;
}) {
  const { notify, hide } = useNotification();
  const { userId } = useAuth();
  const {
    isLoading: isLoadingSubscriptionState,
    isSubscribed,
    refetch: refetchSubscriptionStatus,
  } = useIsSubscribedBounties(
    userId as string,
    bountySlug as string,
    Boolean(userId as string) && Boolean(bountySlug as string)
  );

  function ManageNotification(isSubscription: boolean) {
    const text = isSubscription
      ? `This bounty has been added to your watchlist. We'll notify you of changes to this bounty`
      : `Your subscription has been removed and you will no longer receive notifications for this bounty`;
    const notification = {
      title: text,
      content: () => (
        <div className="flex flex-col">
          <Button
            info={{
              label: 'Close',
              onClick: () => {
                hide();
              },
              style: ButtonStyle.TextPurple,
              removePadding: true,
              removeMinWidth: true,
              className: 'w-fit',
            }}
          />
        </div>
      ),
    };
    const config = {
      condition: false,
      delayTime: 5,
      delayType: DelayType.Condition,
      type: NotificationType.Pill,
    };
    notify(notification, config);
  }

  function refetchAfterUserAction(subscribed: boolean) {
    ManageNotification(subscribed);
    if (isAccountPage) {
      void refetchSubscribedBounties();
    } else {
      void refetchSubscriptionStatus();
    }
  }

  const { isLoading: isLoadingSubs, SubscribeToBounty } = useSubscribeBounty({
    onSuccess: () => {
      refetchAfterUserAction(true);
    },
  });

  const { isLoading: isLoadingUnSubs, UnSubscribeToBounty } =
    useUnSubscribeBounties({
      onSuccess: () => {
        refetchAfterUserAction(false);
      },
    });

  const isLoadingAll =
    isLoadingSubscriptionState || isLoadingUnSubs || isLoadingSubs;

  function ManageClick() {
    if (isSubscribed) {
      UnSubscribeToBounty({
        userId: userId ? userId : '',
        bountySlug,
      });
    } else {
      SubscribeToBounty({
        userId: userId ? userId : '',
        bountySlug,
      });
    }
  }

  const buttonConfig = button(isLoadingAll, !!isSubscribed);

  if (!buttonConfig.label) {
    buttonConfig.label = isSubscribed ? 'Watching' : 'Watch';
  }

  return (
    <Button
      info={{
        ...buttonConfig,
        onClick: ManageClick,
        iconClasses: isLoadingAll ? 'animate-spin' : '',
        icon: isLoadingAll ? 'sync' : 'visibility',
        disabled: isLoadingAll,
        label: useLabel ? buttonConfig.label : undefined,
      }}
    />
  );
}
