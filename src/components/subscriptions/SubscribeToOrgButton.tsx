import Loading from '@/components/utils/Loading';
import {
  useIsSubscribed,
  useSubscribe,
  useUnSubscribe,
} from '@/lib/hooks/subscriptionHooks';

import {
  Button,
  ButtonInformation,
  ButtonStyle,
} from '@/components/utils/Button';

import { useAuth } from '@/auth/AuthContext';

import { DelayType, NotificationType } from '../notifications/iNotification';
import { useNotification } from '../notifications/NotificationContext';

export function SubToOrgButton({
  orgId,
  button,
  bounties,
  isLoading,
  count,
  useLabel = true,
}: {
  orgId: string;
  bounties?: any;
  isLoading?: boolean;
  count?: number;
  useLabel?: boolean;
  button: (isLoading: boolean, isSubscribed: boolean) => ButtonInformation;
}) {
  const { notify, hide } = useNotification();
  const { userId } = useAuth();
  const { isLoading: isLoadingSubscriptionState, isSubscribed } =
    useIsSubscribed(
      userId as string,
      orgId as string,
      Boolean(userId as string) && Boolean(orgId as string)
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

  const bountySlugs: string[] = [];
  bounties &&
    bounties.map((item: any) => {
      bountySlugs.push(item.slug);
    });
  const { isLoading: isLoadingSubs, SubscribeToOrg } = useSubscribe(
    userId as string,
    orgId as string,
    bountySlugs as string[]
  );

  const { isLoading: isLoadingUnSubs, UnSubscribeToOrg } = useUnSubscribe(
    userId as string,
    orgId as string
  );
  const isLoadingAll =
    isLoadingSubscriptionState || isLoadingSubs || isLoadingUnSubs;
  function ManageClick() {
    if (isSubscribed) {
      // ManageNotification(subscribe);
      UnSubscribeToOrg({
        userId: userId ? userId : '',
        orgId,
      });
    } else {
      SubscribeToOrg({
        userId: userId ? userId : '',
        orgId,
        bountySlugs,
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
