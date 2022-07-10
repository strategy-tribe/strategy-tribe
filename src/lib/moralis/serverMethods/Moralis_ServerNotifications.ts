import { ServerNotification } from '@/components/notifications/iNotification';
import { Moralis } from 'moralis';
import { NOTIFICATIONS_TABLE } from './tables';

export const Moralis_getNotifications = (
  userId: string,
  limit: number
): { fetch: () => Promise<ServerNotification[] | undefined> } => {
  const fetch = async () => {
    const query = new Moralis.Query(NOTIFICATIONS_TABLE);
    query.limit(limit);
    query.equalTo('userId', userId);

    const notifsRefs = await query.find();

    const notifs = CastNotifications(notifsRefs);
    return notifs;
  };

  return {
    fetch,
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
