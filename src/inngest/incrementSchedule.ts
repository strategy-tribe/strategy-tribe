import { Inngest } from 'inngest';

import { IncrementBounty } from '@/server/dataModifications/incrementBounty';
import { LOG } from '@/server/importer/utils';

const inngest = new Inngest({ name: 'StrategyTribe' });

export default inngest.createScheduledFunction(
  'Bounty Increment', // The name of your function, used for observability.
  '*/5 * * * *', // The cron syntax for the function.
  // This code will be called on the schedule above
  async () => {
    LOG('Running bounty increment job');
    return await IncrementBounty();
  }
);
