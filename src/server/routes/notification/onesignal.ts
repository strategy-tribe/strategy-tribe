import axios from 'axios';

const ONE_SIGNAL_URL = process.env.ONE_SIGNAL_URL as string;
const KEY_APP_KEY = process.env.ONE_SIGNAL_APP_KEY as string;
const APP_ID = process.env.ONE_SIGNAL_APP_ID as string;

export type OneSignalNotificationLoad = {
  user: string;
  message: string;
  url: string;
};

export const OneSignal_NotifyMultiple = async (
  loads: OneSignalNotificationLoad[]
) => {
  const promises: Promise<void>[] = [];
  for (const load of loads) {
    promises.push(OneSignal_Notify(load));
  }

  await Promise.all(promises);
};

const OneSignal_Notify = async (load: OneSignalNotificationLoad) => {
  const data = {
    app_id: APP_ID,
    contents: { en: load.message },
    include_external_user_ids: [load.user],
    urlCallback: load.url,
  };

  await axios.post(ONE_SIGNAL_URL, {
    method: 'POST',
    url: ONE_SIGNAL_URL,
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${KEY_APP_KEY}`,
    },
  });
};
