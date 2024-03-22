import { router } from '../procedures';
import { getLeaderboardUsers } from '../routes/users/getLeaderboardUsers';
import { getUser } from '../routes/users/getUser';
import { getUsers } from '../routes/users/getUsers';
import { updateUsername } from '../routes/users/updateUsername';
import { updateUserRole } from '../routes/users/updateUserRole';

export const userRouter = router({
  getLeaderboardUsers: getLeaderboardUsers,
  updateUsername: updateUsername,
  getUser: getUser,
  getUsers: getUsers,
  updateUserRole: updateUserRole,
});
