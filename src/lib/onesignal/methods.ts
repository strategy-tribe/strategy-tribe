export async function addSubscriber(userId: string, orgName: string) {
  // const success = await Moralis.Cloud.run('addSubscriber', {
  //   userId,
  //   orgName,
  // });
  // return success as CloudFunctionResponse;
  return { success: false, error: undefined };
}

export async function isSubscribed(
  userId: string,
  orgName: string
): Promise<boolean> {
  // const subscribed = await Moralis.Cloud.run('isSubscribed', {
  //   userId,
  //   orgName,
  // });

  // return subscribed as boolean;
  return false;
}

export async function removeSubscriber(userId: string, orgName: string) {
  // const success = await Moralis.Cloud.run('removeSubscriber', {
  //   userId,
  //   orgName,
  // });

  // return success as CloudFunctionResponse;
  return { success: false, error: undefined };
}

//! Mass subscriptions
export async function isSubscribedToAll(userId: string): Promise<boolean> {
  // const subscribed = await Moralis.Cloud.run('isSubscribedToAll', {
  //   userId,
  // });

  return false;
}

export async function addSubscriberToAll(userId: string): Promise<any> {
  // const success = await Moralis.Cloud.run('addSubscriberToAll', {
  //   userId,
  // });
  // return success as CloudFunctionResponse;
  return { success: false, error: undefined };
}
export async function removeSubscriberFromAll(userId: string): Promise<any> {
  // const success = await Moralis.Cloud.run('removeSubscriberFromAll', {
  //   userId,
  // });
  // return success as CloudFunctionResponse;
  return { success: false, error: undefined };
}
