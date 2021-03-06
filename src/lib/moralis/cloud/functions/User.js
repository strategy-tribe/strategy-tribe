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
  subscribersQuery.contains('subs', userId);
  const orgs = await subscribersQuery.find({ useMasterKey: true });

  const orgSubscribedTo = orgs.map((org) => {
    return {
      name: org.get('name'),
      type: 'Organization',
      id: org.get('orgId'),
    };
  });

  const { isAdmin, isStaff } = await GetUserRole(userId);

  const info = {
    userId: userId,
    mainWallet: user.get('ethAddress'),
    wallets: user.get('accounts'),
    email: user.get('email'),
    joined: user.get('createdAt'),
    watching: orgSubscribedTo,
    isAdmin,
    isStaff,
  };

  return { data: info, success: true };
});
