import { router } from '../procedures';
import { connectBounty } from '../routes/fingerprint/connectBounty';

export const fingerprintRouter = router({
  connectBounty: connectBounty,
});
