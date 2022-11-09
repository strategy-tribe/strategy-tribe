import { router } from '../procedures';
import { getBounties } from '../routes/bounties/getBounties';
import { getBounty } from '../routes/bounties/getBounty';

export const bountyRouter = router({
  getBounty: getBounty,
  getBounties: getBounties,
});
