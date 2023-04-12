import { SubToBountyButton } from '@/components/subscriptions/SubscribeToBountyButton';
import { SubToOrgButton } from '@/components/subscriptions/SubscribeToOrgButton';
import { ButtonStyle } from '@/components/utils/Button';
import {
  BountyLink,
  OrganizationLink,
} from '@/components/utils/OrganizationLink';

export function SubscriptionEntry({
  subscription,
  view,
  refetchSubscribedBounties,
  refetchSubscribedOrgs,
}: {
  subscription: any;
  view: string;
  refetchSubscribedBounties: () => void;
  refetchSubscribedOrgs: () => void;
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
            isAccountPage={true}
            isLoading={false}
            orgId={subscription.orgId}
            refetchSubscribedOrgs={refetchSubscribedOrgs}
            refetchSubscribedBounties={refetchSubscribedBounties}
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
            isAccountPage={true}
            bountySlug={subscription.bountySlug}
            refetchSubscribedBounties={refetchSubscribedBounties}
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
