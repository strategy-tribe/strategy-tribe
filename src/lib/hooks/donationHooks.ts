import { useMutation } from '@tanstack/react-query';
import { ethers } from 'ethers';
import { useState } from 'react';

import { Donation } from '@/lib/models/donation';

import { PostDonationSchemaParams } from '@/server/routes/donations/postDonation';

import { trpc } from '../trpc';

const CHAIN_ID = process.env.NEXT_PUBLIC_CHAIN_ID as string;

async function newDonation(donation: Donation) {
  const {
    to: {
      wallet: { address: to },
    },
    from: { wallet: from },
    amountInEth,
  } = donation;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore`;
  const { ethereum } = window;
  if (!ethereum) {
    throw new Error("We could't connect to your wallet");
  }
  // const ethers = Moralis.web3Library;
  const amount = ethers.utils.parseUnits(amountInEth.toString(), 'ether');
  try {
    await ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: CHAIN_ID }],
    });
    const hash = await ethereum.request({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore`;
      method: 'eth_sendTransaction',
      params: [
        {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore`;
          from,
          value: amount.toHexString(),
          to,
          chainId: CHAIN_ID,
        },
      ],
    });
    return hash;
  } catch (error) {
    throw new Error("We could't connect to your wallet.");
  }
}

export const useCreateDonation = (
  donation: Donation,
  after?: {
    onSuccess?: (txnHash: string) => void;
    onError?: (e: string | Error) => void;
  }
) => {
  const [isLoading, setisLoading] = useState(false);

  const { mutate: createDonation, error } = useMutation(
    async () => {
      setisLoading(true);
      return newDonation(donation)
        .then((txnHash: string) => {
          setisLoading(false);
          return txnHash;
        })
        .finally(() => setisLoading(false));
    },
    {
      onError: after?.onError,
      onSuccess: after?.onSuccess,
    }
  );

  return { createDonation, isLoading, error };
};

export const usePostDonation = () => {
  const mutation = trpc.donation.postDonation.useMutation();
  return {
    AddDonation: async (p: PostDonationSchemaParams) => {
      mutation.mutate(p);
    },
    isLoading: mutation.isLoading,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
  };
};
