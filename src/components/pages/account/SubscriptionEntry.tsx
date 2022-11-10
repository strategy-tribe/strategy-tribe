import { SubToOrgButton } from '@/components/subscriptions/SubscribeToOrgButton';
import { ButtonStyle } from '@/components/utils/Button';
import {
  BountyLink,
  OrganizationLink,
} from '@/components/utils/OrganizationLink';

import { Subscription } from '@/auth/AuthContext';

export function SubscriptionEntry({
  subscription,
}: {
  subscription: Subscription;
}) {
  return (
    <div className="flex w-full items-center justify-between">
      {subscription.type === 'Org' && (
        <>
          <OrganizationLink
            orgName={subscription.name}
            className="body w-fit text-on-surface-p1 hover:underline"
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
      {subscription.type === 'Individual' && (
        <BountyLink
          bountyId={subscription.id}
          className="body w-fit text-on-surface-p1 hover:underline"
        />
      )}
    </div>
  );
}
