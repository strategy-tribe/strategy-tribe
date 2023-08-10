import { router } from '../procedures';
import { getNotification } from '../routes/notification/getNotification';
import { getManyNotifications } from '../routes/notification/getNotifications';
import { markAsRead } from '../routes/notification/markAsRead';
import { markManyAsRead } from '../routes/notification/markManyAsRead';

export const notificationRouter = router({
  get: getNotification,
  getMany: getManyNotifications,
  markAsRead,
  markManyAsRead,
});
