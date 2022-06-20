//*Cloud functions
Moralis.Cloud.define('isStaff', async (request) => {
  const { userId } = request.params;
  const q = new Moralis.Query(ROLES_TABLE);
  q.equalTo('name', 'staff');
  const results = await q.find({ useMasterKey: true });

  const staffRole = results.at(0);

  const users = await staffRole
    .getUsers()
    .query()
    .equalTo('objectId', userId)
    .find({ useMasterKey: true });

  const isStaff = users.length > 0;

  return { userId, isStaff };
});
