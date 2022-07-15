async function GetUserRole(userId) {
  const isStaff = await CheckIfIsStaff(userId);

  if (isStaff) return { userId, isStaff, isAdmin: false };
  else {
    const isAdmin = await CheckIfIsAdmin(userId);
    return { userId, isStaff: false, isAdmin };
  }
}

async function CheckIfIsStaff(userId) {
  const staffQuery = new Moralis.Query(ROLES_TABLE);
  staffQuery.equalTo('name', STAFF_ROLE);
  const staffRole = await staffQuery.first({ useMasterKey: true });

  const users = await staffRole
    .getUsers()
    .query()
    .equalTo('objectId', userId)
    .find({ useMasterKey: true });

  const isStaff = users.length > 0;

  return isStaff;
}

async function CheckIfIsAdmin(userId) {
  const adminQuery = new Moralis.Query(ROLES_TABLE);
  adminQuery.equalTo('name', ADMIN_ROLE);

  const adminRole = await adminQuery.first({ useMasterKey: true });

  const users = await adminRole
    .getUsers()
    .query()
    .equalTo('objectId', userId)
    .find({ useMasterKey: true });

  const isAdmin = users.length > 0;

  return isAdmin;
}
