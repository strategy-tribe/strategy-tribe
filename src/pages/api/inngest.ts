import { serve } from 'inngest/next';

import incrementFn from '../../inngest/incrementSchedule';

export default serve('StrategyTribe', [incrementFn]);
