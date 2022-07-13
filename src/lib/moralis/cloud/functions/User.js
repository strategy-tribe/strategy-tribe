Moralis.Cloud.define('getUserInfo', async (request) => {
  const { userId } = request.params;
  const q = new Moralis.Query('_User');
  q.equalTo('objectId', userId);
  const user = await q.first({ useMasterKey: true });

  if (!user) {
    return {
      success: false,
      error: 'Could not find user',
    };
  }

  //get subscriptions
  const subscribersQuery = new Moralis.Query(ORG_SUBS_TABLE);

  const allOrg = await subscribersQuery.find({ useMasterKey: true });

  const orgSubscribedTo = allOrg
    .filter((org) => org.get('subs').includes(userId))
    .map((org) => org.get('name'));

  const { isAdmin, isStaff } = await GetUserRole(userId);

  const info = {
    userId: userId,
    mainWallet: user.get('ethAddress'),
    wallets: user.get('accounts'),
    joined: user.get('createdAt'),
    email: user.get('email'),
    subscribedTo: orgSubscribedTo,
    isAdmin,
    isStaff,
  };

  return { data: info, success: true };
});
