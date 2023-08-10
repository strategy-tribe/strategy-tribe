import { router } from '../procedures';
import { postDonation } from '../routes/donations/postDonation';

export const donationRouter = router({
  postDonation: postDonation,
});
