import { Moralis } from 'moralis';
import { CloudFunctionResponse } from '@/lib/moralis/utils/CloudFunctionResponse';

export async function addSubscriber(
  userId: string,
  orgName: string
): Promise<CloudFunctionResponse> {
  const success = await Moralis.Cloud.run('addSubscriber', {
    userId,
    orgName,
  });

  return success as CloudFunctionResponse;
}

export async function isSubscribed(
  userId: string,
  orgName: string
): Promise<boolean> {
  const subscribed = await Moralis.Cloud.run('isSubscribed', {
    userId,
    orgName,
  });

  return subscribed as boolean;
}

export async function removeSubscriber(
  userId: string,
  orgName: string
): Promise<CloudFunctionResponse> {
  const success = await Moralis.Cloud.run('removeSubscriber', {
    userId,
    orgName,
  });

  return success as CloudFunctionResponse;
}

//! Mass subscriptions
export async function isSubscribedToAll(userId: string): Promise<boolean> {
  const subscribed = await Moralis.Cloud.run('isSubscribedToAll', {
    userId,
  });

  return subscribed as boolean;
}

export async function addSubscriberToAll(
  userId: string
): Promise<CloudFunctionResponse> {
  const success = await Moralis.Cloud.run('addSubscriberToAll', {
    userId,
  });

  return success as CloudFunctionResponse;
}
export async function removeSubscriberFromAll(
  userId: string
): Promise<CloudFunctionResponse> {
  const success = await Moralis.Cloud.run('removeSubscriberFromAll', {
    userId,
  });

  return success as CloudFunctionResponse;
}
