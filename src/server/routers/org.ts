import { getOrgs } from '@/server/routes/organizations/getOrgs';

import { router } from '../procedures';
import { getOrg } from '../routes/organizations/getOrg';

export const orgRouter = router({
  getOrgs: getOrgs,
  getOrg: getOrg,
});
