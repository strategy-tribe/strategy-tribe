async function GetUserRole(userId, request) {
  const isStaff = await CheckIfIsStaff(userId, request);
  if (isStaff) return { userId, isStaff, isAdmin: false };
  else {
    const isAdmin = await CheckIfIsAdmin(userId, request);
    return { userId, isStaff: false, isAdmin };
  }
}

async function CheckIfIsStaff(userId, request) {
  IsAuthorized(request, userId);

  const staffQuery = new Moralis.Query(ROLES_TABLE);
  staffQuery.equalTo('name', STAFF_ROLE);
  const staffRole = await staffQuery.first({ useMasterKey: true });

  const user = await staffRole
    .getUsers()
    .query()
    .equalTo('objectId', userId)
    .first({ useMasterKey: true });

  return !!user;
}

async function CheckIfIsAdmin(userId, request) {
  IsAuthorized(request, userId);

  const adminQuery = new Moralis.Query(ROLES_TABLE);
  adminQuery.equalTo('name', ADMIN_ROLE);

  const adminRole = await adminQuery.first({ useMasterKey: true });

  const user = await adminRole
    .getUsers()
    .query()
    .equalTo('objectId', userId)
    .first({ useMasterKey: true });

  return !!user;
}
