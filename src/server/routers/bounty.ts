import { router } from '../procedures';
import { getBounties } from '../routes/bounties/getBounties';
import { getBounty } from '../routes/bounties/getBounty';
import { getFilterTags } from '../routes/bounties/getFilterTags';
import { postBounties } from '../routes/bounties/postBounties';

export const bountyRouter = router({
  getBounty: getBounty,
  getBounties: getBounties,
  getFilterTags: getFilterTags,
  postBounties: postBounties,
});
