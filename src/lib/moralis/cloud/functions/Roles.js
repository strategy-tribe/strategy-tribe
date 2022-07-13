//*Cloud functions
Moralis.Cloud.define('isStaff', async (request) => {
  const { userId } = request.params;

  const isStaff = await CheckIfIsStaff(userId);
  return { userId, isStaff, isAdmin: false };
});

Moralis.Cloud.define('getRole', async (request) => {
  const { userId } = request.params;

  return await GetUserRole(userId);
});
