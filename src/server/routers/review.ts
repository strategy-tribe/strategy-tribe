import { router } from '../procedures';
import { getReviews } from '../routes/review/getReviews';
import { postReview } from '../routes/review/postReview';

export const reviewRouter = router({
  post: postReview,
  getReviews: getReviews,
});
