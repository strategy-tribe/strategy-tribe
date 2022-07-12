Moralis.Cloud.define('markAsRead', async (request) => {
  const { notificationId } = request.params;
  try {
    const q = new Moralis.Query(NOTIFICATIONS_TABLE);

    q.equalTo('objectId', notificationId);

    const notification = await q.first();

    if (!notification) {
      ERROR('No notification found', true);
    }

    notification.set('read', true);

    await notification.save(null, { useMasterKey: true });

    return true;
  } catch (error) {
    ERROR(
      `Error setting notification ("${notificationId}"). Reason: ${error}`,
      true
    );
  }
});
