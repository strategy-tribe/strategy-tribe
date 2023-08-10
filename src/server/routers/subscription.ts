import { router } from '../procedures';
import { getSubscribedBounties } from '../routes/subscription/getSubscribedBounties';
import { getSubscribedOrgs } from '../routes/subscription/getSubscribedOrgs';
import { getSubscriptionStatus } from '../routes/subscription/getSubscriptionStatus';
import { getSubscriptionStatusBounty } from '../routes/subscription/getSubscriptionStatusBounty';
import { subscribeBounty } from '../routes/subscription/subscribeBounty';
import { subscribeOrg } from '../routes/subscription/subscribeOrg';
import { unSubscribeBounty } from '../routes/subscription/unSubscribeBounty';
import { unSubscribeOrg } from '../routes/subscription/unSubscribeOrg';

export const subscriptionRouter = router({
  subscribeOrg: subscribeOrg,
  getSubscriptionStatus: getSubscriptionStatus,
  unSubscribeOrg: unSubscribeOrg,
  getSubscribedOrgs: getSubscribedOrgs,
  getSubscriptionStatusBounty: getSubscriptionStatusBounty,
  subscribeBounty: subscribeBounty,
  unSubscribeBounty: unSubscribeBounty,
  getSubscribedBounties: getSubscribedBounties,
});
