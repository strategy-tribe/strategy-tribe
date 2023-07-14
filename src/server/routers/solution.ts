import { router } from '../procedures';
import { getSolution } from '../routes/solutions/getSolution';
import { getSolutions } from '../routes/solutions/getSolutions';
import { post } from '../routes/solutions/postSolution';

export const solutionRouter = router({
  post: post,
  getSolutions: getSolutions,
  getSolution: getSolution,
});
