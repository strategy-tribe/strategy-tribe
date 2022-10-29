import {
  Button,
  ButtonInformation,
  ButtonStyle
} from '@/components/utils/Button';
import { useIsSubscribed, useSubscribe } from '@/hooks/subscriptionHooks';
import { useAuth } from 'auth/AuthContext';
import { DelayType, NotificationType } from '../notifications/iNotification';
import { useNotification } from '../notifications/NotificationContext';




export function SubToOrgButton({
  orgId,
  button,
  useLabel = true,
}: {
  orgId: string;
  useLabel?: boolean;
  button: (isLoading: boolean, isSubscribed: boolean) => ButtonInformation;
}) {
  const { notify, hide } = useNotification();

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

  const { userId } = useAuth();

  const { isLoading: isLoadingSubscriptionState, isSubscribed } =
    useIsSubscribed(
      userId as string,
      orgId as string,
      Boolean(userId as string) && Boolean(orgId as string)
    );

  const {
    subscribe,
    unsubscribe,
    isLoading: isLoadingSubs,
  } = useSubscribe(userId as string, orgId as string);

  const isLoading = isLoadingSubscriptionState || isLoadingSubs;

  function ManageClick() {
    if (isSubscribed) {
      unsubscribe();
      ManageNotification(subscribe);
    } else {
      subscribe();
      ManageNotification(unsubscribe);
    }
  }

  const buttonConfig = button(isLoading, !!isSubscribed);

  if (!buttonConfig.label) {
    buttonConfig.label = isSubscribed ? 'Watching' : 'Watch';
  }

  return (
    <Button
      info={{
        ...buttonConfig,
        onClick: ManageClick,
        iconClasses: isLoading ? 'animate-spin' : '',
        icon: isLoading ? 'sync' : 'visibility',
        disabled: isLoading,
        label: useLabel ? buttonConfig.label : undefined,
      }}
    />
  );
}
