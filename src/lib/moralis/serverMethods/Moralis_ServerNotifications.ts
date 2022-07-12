import { ServerNotification } from '@/components/notifications/iNotification';
import { Moralis } from 'moralis';
import { NOTIFICATIONS_TABLE } from './tables';

export const Moralis_getNotifications = (
  userId: string,
  limit?: number | undefined,
  onlyUnread = true
): { fetch: () => Promise<ServerNotification[] | undefined> } => {
  const fetch = async () => {
    const query = new Moralis.Query(NOTIFICATIONS_TABLE);
    query.equalTo('userId', userId);
    if (limit) query.limit(limit);
    if (onlyUnread) query.equalTo('read', false);

    const notifsRefs = await query.find();

    const notifs = CastNotifications(notifsRefs);

    return notifs;
  };

  return {
    fetch,
  };
};

export const Moralis_setNotificationRead = () => {
  const call = async (notificationId: string) => {
    const success = (await Moralis.Cloud.run('markAsRead', {
      notificationId: notificationId,
    })) as boolean;

    return success;
  };

  return {
    call,
  };
};

function CastNotifications(refs: Moralis.Object<Moralis.Attributes>[]) {
  const notifs: ServerNotification[] = [];
  for (const notifRef of refs) {
    const notif: ServerNotification = {
      ...(notifRef.attributes as ServerNotification),
      id: notifRef.id,
      createdAt: notifRef.createdAt,
    };
    notifs.push(notif);
  }
  return notifs;
}
