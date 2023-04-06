import {
  BountyLink,
  OrganizationLink,
} from '@/components/utils/OrganizationLink';

import { SubToBountyButton } from '@/components/subscriptions/SubscribeToBountyButton';
import { SubToOrgButton } from '@/components/subscriptions/SubscribeToOrgButton';
import { ButtonStyle } from '@/components/utils/Button';

export function SubscriptionEntry({
  subscription,
  view,
}: {
  subscription: any;
  view: string;
}) {
  return (
    <div className="flex w-full items-center justify-between space-y-3">
      {view === 'ORG' && (
        <>
          <div className="mt-3 text-xl font-bold">
            <OrganizationLink
              orgName={subscription.org.name}
              className="body w-fit text-on-surface-p1 hover:underline"
            />
          </div>
          <SubToOrgButton
            orgId={subscription.orgId}
            button={(_, isSubscribed) => {
              return {
                removeMinWidth: true,
                style: isSubscribed ? ButtonStyle.Text : ButtonStyle.Filled,
              };
            }}
          />
        </>
      )}
      {view === 'INDIVIDUAL' && (
        <>
          <BountyLink
            bountyId={subscription.bountySlug}
            title={subscription.bounty.title}
            className="body w-fit text-on-surface-p1 hover:underline"
          />
          <SubToBountyButton
            bountySlug={subscription.bountySlug}
            button={(_, isSubscribed) => {
              return {
                removeMinWidth: true,
                style: isSubscribed ? ButtonStyle.Text : ButtonStyle.Filled,
              };
            }}
          />
        </>
      )}
    </div>
  );
}
