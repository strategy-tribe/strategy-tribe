Moralis.Cloud.define('markAsRead', async (req) => {
  try {
    const { notificationId } = req.params;

    const q = new Moralis.Query(NOTIFICATIONS_TABLE);
    q.equal('objectId', notificationId);
    const notification = await q.first();

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
