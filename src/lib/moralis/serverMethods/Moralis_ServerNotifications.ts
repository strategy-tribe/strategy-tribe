import { ServerNotification } from '@/components/notifications/iNotification';
import { Moralis } from 'moralis';
import { NOTIFICATIONS_TABLE } from './tables';

export const Moralis_getNotifications = (
  userId: string,
  limit: number,
  onlyUnread = true
): { fetch: () => Promise<ServerNotification[] | undefined> } => {
  const fetch = async () => {
    const query = new Moralis.Query(NOTIFICATIONS_TABLE);
    query.limit(limit);
    query.equalTo('userId', userId);
    if (onlyUnread) query.equalTo('read', true);

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
      notificationId,
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
