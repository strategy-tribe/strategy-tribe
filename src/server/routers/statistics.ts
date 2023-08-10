import { getAvgSubmissionPayout } from '@/server/routes/statistics/getAvgSubmissionPayout';
import { getFundsData } from '@/server/routes/statistics/getFundsData';

import { router } from '../procedures';
import { getBountiesStatus } from '../routes/statistics/getBountiesStatus';
import { getSubmissionGroth } from '../routes/statistics/getSubmissionGrowth';
import { getSubmissionsStatus } from '../routes/statistics/getSubmissionsStatus';
import { getUsersCount } from '../routes/statistics/getUsersCount';

export const statisticsRouter = router({
  getBountiesStatus: getBountiesStatus,
  getSubmissionsStatus: getSubmissionsStatus,
  getAvgSubmissionPayout: getAvgSubmissionPayout,
  getFundsData: getFundsData,
  getUsersCount: getUsersCount,
  getSubmissionGroth: getSubmissionGroth,
});
