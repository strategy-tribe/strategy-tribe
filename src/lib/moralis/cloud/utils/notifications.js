async function CreateNotification(users, message, url) {
  try {
    const { APP_ID, KEY_APP_KEY } = await GetOneSignalKeys();
    const data = {
      app_id: APP_ID,
      contents: { en: message },
      include_external_user_ids: users,
      url,
    };

    //notifiy push notifs
    const pushNotifs = () => {
      Moralis.Cloud.httpRequest({
        method: 'POST',
        url: 'https://onesignal.com/api/v1/notifications',
        body: data,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${KEY_APP_KEY}`,
        },
      });
    };

    //create a notification in the db for each user in users
    //create the notification in the db
    const promises = users.map((user) =>
      SaveNotificationInDB(message, user, url)
    );
    await Promise.all([...promises, pushNotifs()]);
  } catch (error) {
    ERROR(`Error sending notification: ${error}`);
  }
}

async function SaveNotificationInDB(message, userId, url) {
  try {
    //moralis new object
    const notifRef = new Moralis.Object(NOTIFICATIONS_TABLE);

    //set these properties:
    notifRef.set('userId', userId);
    notifRef.set('message', message);
    notifRef.set('type', '');
    notifRef.set('read', false);
    notifRef.set('url', url);

    //set the ACL for the user only
    const acl = new Moralis.ACL();
    acl.setPublicReadAccess(true);
    acl.setPublicWriteAccess(false);
    acl.setRoleWriteAccess('staff', false);
    acl.setRoleReadAccess('staff', true);
    acl.setReadAccess(userId, true);
    acl.setWriteAccess(userId, true);
    notifRef.setACL(acl);

    //return
    await notifRef.save(null, { useMasterKey: true });
  } catch (error) {
    ERROR(
      `Error saving notification:\n"${msg}"\nto database. \nReason: ${error}`
    );
  }
}
