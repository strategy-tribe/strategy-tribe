import { router } from '../procedures';
import { getLeaderboardUsers } from '../routes/users/getLeaderboardUsers';

export const userRouter = router({
  getLeaderboardUsers: getLeaderboardUsers,
});
