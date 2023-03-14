import { serve } from 'inngest/next';

import fundDataFn from '../../inngest/fundDataSchedule';
import incrementFn from '../../inngest/incrementSchedule';

export default serve('StrategyTribe', [incrementFn, fundDataFn]);
