import {
  DelayType,
  NotificationType,
} from '@/components/notifications/iNotification';
import { useNotification } from '@/components/notifications/NotificationContext';
import { Button, ButtonStyle } from '@/components/utils/Button';
import { SubToOrgButton } from '@/components/subscriptions/SubscribeToOrgButton';
import { useAuth } from 'auth/AuthContext';
import {
  BountyLink,
  OrganizationLink,
} from '@/components/utils/OrganizationLink';
import { Subscription } from '@/lib/moralis/ServerContextProvider';
import { TargetType } from '@/lib/models/targetType';

export function SubscriptionEntry({
  subscription,
}: {
  subscription: Subscription;
}) {
  //org name
  //sub button
  const { userId } = useAuth();
  const { notify, hide } = useNotification();

  function ManageNotification(undo: () => void) {
    const notification = {
      title: 'Success',
      content: (
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

  return (
    <div className="flex w-full items-center justify-between">
      {subscription.type === TargetType.Organization && (
        <>
          <OrganizationLink
            orgName={subscription.name}
            className="text-text body w-fit hover:underline"
          />

          <SubToOrgButton
            userId={userId}
            orgName={subscription.name}
            onClick={ManageNotification}
          />
        </>
      )}
      {subscription.type === TargetType.Individual && (
        <BountyLink
          bountyId={subscription.id}
          className="text-text body w-fit hover:underline"
        />
      )}
    </div>
  );
}
