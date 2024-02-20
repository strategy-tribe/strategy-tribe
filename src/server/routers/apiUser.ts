import { router } from '../procedures';
import { getApiUser } from '../routes/apiUsers/getApiUser';
import { getApiUsers } from '../routes/apiUsers/getApiUsers';
import { postApiUser } from '../routes/apiUsers/postApiUser';

export const apiUserRouter = router({
  getApiUsers,
  getApiUser,
  postApiUser,
});
