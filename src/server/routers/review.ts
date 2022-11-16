import { router } from '../procedures';
import { postReview } from '../routes/review/getReview';

export const reviewRouter = router({
  post: postReview,
});
