//*Ind Subscriptions

Moralis.Cloud.define('isSubscribed', async (request) => {
  const { userId, orgName } = request.params;
  const q = new Moralis.Query(ORG_SUBS_TABLE);
  q.equalTo('name', orgName);
  const orgSubsRef = await q.first({ useMasterKey: true });

  if (!orgSubsRef) {
    return false;
  }

  const subs = orgSubsRef.get('subs');

  return subs.includes(userId);
});

Moralis.Cloud.define('addSubscriber', async (request) => {
  const { userId, orgName } = request.params;
  if (!userId || !orgName) {
    const errMsg = `Trying to subscribe null user (${userId}) or empty orgName (${orgName})`;
    return {
      success: false,
      error: errMsg,
    };
  }
  const q = new Moralis.Query(ORG_SUBS_TABLE);
  q.equalTo('name', orgName);
  const orgSubsRef = await q.first({ useMasterKey: true });

  if (!orgSubsRef) {
    ERROR(`Validation error: Could not find the org: ${orgName}`);
    return {
      success: false,
      error: `Validation error: Could not find the org: ${orgName}`,
    };
  }

  const subs = orgSubsRef.get('subs');

  if (subs.includes(userId)) {
    return {
      success: true,
      error: `User is already subscribed`,
    };
  }

  subs.push(userId);
  orgSubsRef.set('subs', subs);
  await orgSubsRef.save(null, { useMasterKey: true });

  return {
    success: true,
    message: `Subscribed`,
  };
});

Moralis.Cloud.define('removeSubscriber', async (request) => {
  const { userId, orgName } = request.params;
  const q = new Moralis.Query(ORG_SUBS_TABLE);
  q.equalTo('name', orgName);
  const orgSubsRef = await q.first({ useMasterKey: true });

  if (!orgSubsRef) {
    ERROR(`Validation error: Could not find the org: ${orgName}`);
    return {
      success: false,
      error: `Validation error: Could not find the org: ${orgName}`,
    };
  }

  const subs = orgSubsRef.get('subs');

  if (!subs.includes(userId)) {
    return {
      success: true,
      error: `User was not subscribed`,
    };
  }

  const newSubs = subs.filter((s) => s !== userId);
  orgSubsRef.set('subs', newSubs);
  await orgSubsRef.save(null, { useMasterKey: true });

  return {
    success: true,
    message: `Unsubscribed`,
  };
});

//*Mass Subscriptions
Moralis.Cloud.define('isSubscribedToAll', async (request) => {
  const { userId } = request.params;
  const qSubscribedto = new Moralis.Query(ORG_SUBS_TABLE);
  qSubscribedto.equalTo('subs', userId);
  const numOfSubscriptions = await qSubscribedto.count({ useMasterKey: true });

  if (numOfSubscriptions === 0) {
    return false;
  }

  const qAllOrg = new Moralis.Query(ORG_SUBS_TABLE);
  const allOrg = await qAllOrg.count({ useMasterKey: true });

  return numOfSubscriptions === allOrg;
});

Moralis.Cloud.define('addSubscriberToAll', async (request) => {
  const { userId } = request.params;
  if (!userId) {
    const errMsg = `Trying to subscribe null user (${userId})`;
    ERROR(errMsg);
    return {
      success: false,
      error: errMsg,
    };
  }
  const q = new Moralis.Query(ORG_SUBS_TABLE);
  const allOrgs = await q.find({ useMasterKey: true });

  for await (const org of allOrgs) {
    const subs = org.get('subs');

    if (!subs.includes(userId)) {
      subs.push(userId);
      org.set('subs', subs);
      await org.save(null, { useMasterKey: true });
    }
  }

  return {
    success: true,
    message: `Subscribed to all`,
  };
});

Moralis.Cloud.define('removeSubscriberFromAll', async (request) => {
  const { userId } = request.params;
  if (!userId) {
    const errMsg = `Trying to subscribe null user (${userId})`;
    return {
      success: false,
      error: errMsg,
    };
  }
  const q = new Moralis.Query(ORG_SUBS_TABLE);
  const allOrgs = await q.find({ useMasterKey: true });

  for await (const org of allOrgs) {
    const subs = org.get('subs');

    if (subs.includes(userId)) {
      const newSubs = subs.filter((id) => id !== userId);
      org.set('subs', newSubs);
      await org.save(null, { useMasterKey: true });
    }
  }

  return {
    success: true,
    message: `Unsubscribed from all`,
  };
});
