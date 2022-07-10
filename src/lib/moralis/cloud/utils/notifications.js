async function CreateNotification(users, message, url) {
  try {
    const { APP_ID, KEY_APP_KEY } = await GetOneSignalKeys();
    const data = {
      app_id: APP_ID,
      contents: { en: message },
      include_external_user_ids: users,
      url,
    };

    Moralis.Cloud.httpRequest({
      method: 'POST',
      url: 'https://onesignal.com/api/v1/notifications',
      body: data,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${KEY_APP_KEY}`,
      },
    });
  } catch (error) {
    ERROR(`Error sending notification: ${error}`);
  }
}
