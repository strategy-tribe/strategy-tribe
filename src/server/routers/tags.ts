import { router } from '../procedures';
import { getTag } from '../routes/tags/getTag';
import { getTags } from '../routes/tags/getTags';

export const tagRouter = router({
  getTags,
  getTag,
});
