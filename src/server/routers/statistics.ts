import { getAvgSubmissionPayout } from '@/server/routes/statistics/getAvgSubmissionPayout';
import { getPaidBounties } from '@/server/routes/statistics/getPaidBounties';
import { getTotalBountiesFund } from '@/server/routes/statistics/getTotalBountiesFund';

import { router } from '../procedures';
import { getBountiesStatus } from '../routes/statistics/getBountiesStatus';
import { getSubmissionsStatus } from '../routes/statistics/getSubmissionsStatus';
import { getUsersCount } from '../routes/statistics/getUsersCount';

export const statisticsRouter = router({
  getBountiesStatus: getBountiesStatus,
  getSubmissionsStatus: getSubmissionsStatus,
  getAvgSubmissionPayout: getAvgSubmissionPayout,
  getPaidBounties: getPaidBounties,
  getTotalBountiesFund: getTotalBountiesFund,
  getUsersCount: getUsersCount,
});
