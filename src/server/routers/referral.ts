import { router } from '../procedures';
import { getReferrals } from '../routes/referrals/getReferrals';
import { postReferral } from '../routes/referrals/postReferral';

export const referralRouter = router({
  getReferrals: getReferrals,
  postReferral: postReferral,
});
