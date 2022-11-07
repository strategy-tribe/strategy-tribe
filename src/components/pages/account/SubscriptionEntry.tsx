import { Subscription } from 'auth/AuthContext';

import { SubToOrgButton } from '@/components/subscriptions/SubscribeToOrgButton';
import { ButtonStyle } from '@/components/utils/Button';
import {
  BountyLink,
  OrganizationLink,
} from '@/components/utils/OrganizationLink';

export function SubscriptionEntry({
  subscription,
}: {
  subscription: Subscription;
}) {
  return (
    <div className="flex w-full items-center justify-between">
      {subscription.type === 'ORG' && (
        <>
          <OrganizationLink
            orgId={subscription.id}
            className="text-on-surface-p1 body w-fit hover:underline"
          />

          <SubToOrgButton
            orgId={subscription.id}
            button={(_, isSubscribed) => {
              return {
                removeMinWidth: true,
                style: isSubscribed ? ButtonStyle.Text : ButtonStyle.Filled,
              };
            }}
          />
        </>
      )}
      {subscription.type === 'INDIVIDUAL' && (
        <BountyLink
          bountyId={subscription.id}
          className="text-on-surface-p1 body w-fit hover:underline"
        />
      )}
    </div>
  );
}
