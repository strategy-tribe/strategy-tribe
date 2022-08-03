//*Cloud functions
Moralis.Cloud.define('isStaff', async (request) => {
  const { userId } = request.params;
  IsAuthorized(request, userId);

  const isStaff = await CheckIfIsStaff(userId, request);
  return { userId, isStaff, isAdmin: false };
});

Moralis.Cloud.define('getRole', async (request) => {
  const { userId } = request.params;
  IsAuthorized(request, userId);

  return await GetUserRole(userId, request);
});
