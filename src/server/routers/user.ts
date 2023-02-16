import { router } from '../procedures';
import { getLeaderboardUsers } from '../routes/users/getLeaderboardUsers';
import { getUser } from '../routes/users/getUser';
import { updateUsername } from '../routes/users/updateUsername';

export const userRouter = router({
  getLeaderboardUsers: getLeaderboardUsers,
  updateUsername: updateUsername,
  getUser: getUser,
});
