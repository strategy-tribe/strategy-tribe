import { router } from '../procedures';
import { getPiiSolution } from '../routes/solutions/getPiiSolution';
import { getRawSolution } from '../routes/solutions/getRawSolution';
import { getSolution } from '../routes/solutions/getSolution';
import { getSolutions } from '../routes/solutions/getSolutions';
import { post } from '../routes/solutions/postSolution';

export const solutionRouter = router({
  post: post,
  getSolutions: getSolutions,
  getSolution: getSolution,
  getRawSolution: getRawSolution,
  getPiiSolution: getPiiSolution,
});
