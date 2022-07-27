import { ButtonStyle } from '@/components/utils/Button';
import { SubToOrgButton } from '@/components/subscriptions/SubscribeToOrgButton';
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
  return (
    <div className="flex w-full items-center justify-between">
      {subscription.type === TargetType.Organization && (
        <>
          <OrganizationLink
            orgName={subscription.name}
            className="text-on-surface-p1 body w-fit hover:underline"
          />

          <SubToOrgButton
            orgName={subscription.name}
            button={(_, isSubscribed) => {
              return {
                removeMinWidth: true,
                style: isSubscribed ? ButtonStyle.Text : ButtonStyle.Filled,
              };
            }}
          />
        </>
      )}
      {subscription.type === TargetType.Individual && (
        <BountyLink
          bountyId={subscription.id}
          className="text-on-surface-p1 body w-fit hover:underline"
        />
      )}
    </div>
  );
}
