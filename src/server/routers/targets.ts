import { router } from '../procedures';
import { getTarget } from '../routes/targets/getTarget';
import { getTargets } from '../routes/targets/getTargets';

export const targetRouter = router({
  getTargets: getTargets,
  getTarget: getTarget,
});
