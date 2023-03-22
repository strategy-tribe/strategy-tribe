import { Inngest } from 'inngest';

import { PostFundDataWeekly } from '@/server/dataModifications/postFundData';
import { LOG } from '@/server/importer/utils';
const inngest = new Inngest({ name: 'StrategyTribe' });

export default inngest.createScheduledFunction(
  'Fund data scheduler', // The name of your function, used for observability.
  '0 0 * * MON', // The cron syntax for the function. - Runs every Monday 12 am
  // This code will be called on the schedule above
  async () => {
    LOG('Running fund data job');
    return await PostFundDataWeekly();
  }
);
