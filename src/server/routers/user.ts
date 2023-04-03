import { router } from '../procedures';
import { getInfo } from '../routes/users/getInfo';
import { getLeaderboardUsers } from '../routes/users/getLeaderboardUsers';
import { getUser } from '../routes/users/getUser';
import { postReferral } from '../routes/users/postreferral';
import { updateUsername } from '../routes/users/updateUsername';

export const userRouter = router({
  getLeaderboardUsers: getLeaderboardUsers,
  updateUsername: updateUsername,
  getUser: getUser,
  getInfo: getInfo,
  postReferral: postReferral,
});
