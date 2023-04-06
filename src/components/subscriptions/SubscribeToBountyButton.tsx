import Loading from '@/components/utils/Loading';
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
  bounties,
  isLoading,
  button,
  count,
  useLabel = true,
}: {
  bountySlug: string;
  bounties?: any;
  isLoading?: boolean;
  count?: number;
  useLabel?: boolean;
  button: (isLoading: boolean, isSubscribed: boolean) => ButtonInformation;
}) {
  const { notify, hide } = useNotification();
  const orgId = '';
  const { userId } = useAuth();
  const { isLoading: isLoadingSubscriptionState, isSubscribed } =
    useIsSubscribedBounties(
      userId as string,
      bountySlug as string,
      Boolean(userId as string) && Boolean(bountySlug as string)
    );
  function ManageNotification(undo: () => void) {
    const notification = {
      title: 'Success',
      content: () => (
        <div className="flex flex-col">
          <Button
            info={{
              label: 'Undo',
              onClick: () => {
                undo();
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

  const { isLoading: isLoadingSubs, SubscribeToBounty } = useSubscribeBounty(
    userId as string,
    bountySlug as string
  );

  const { isLoading: isLoadingUnSubs, UnSubscribeToBounty } =
    useUnSubscribeBounties(userId as string, bountySlug as string);
  const isLoadingAll =
    isLoadingSubscriptionState || isLoadingUnSubs || isLoadingSubs;

  function ManageClick() {
    if (isSubscribed) {
      // ManageNotification(subscribe);
      UnSubscribeToBounty({
        userId: userId ? userId : '',
        bountySlug,
      });
    } else {
      SubscribeToBounty({
        userId: userId ? userId : '',
        bountySlug,
      });
      // ManageNotification(unsubscribe);
    }
  }

  const buttonConfig = button(isLoadingAll, !!isSubscribed);

  if (!buttonConfig.label) {
    buttonConfig.label = isSubscribed ? 'Watching' : 'Watch';
  }
  if (isLoading) return <Loading small={true} />;
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
