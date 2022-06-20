import { Donation } from '@/models/donation';
import { useMutation } from 'react-query';
import Moralis from 'moralis';
import { useState } from 'react';

async function newDonation(donation: Donation) {
  const {
    to: { wallet: to },
    from: { wallet: from },
    amountInEth,
  } = donation;

  // @ts-ignore`;
  const { ethereum } = window;


  if (!ethereum) {
    throw new Error("We could't connect to your wallet");
  }

  const ethers = Moralis.web3Library;
  const amount = ethers.utils.parseUnits(amountInEth.toString(), 'ether');

  try {
    await ethereum.request({
      method: 'eth_sendTransaction',
      params: [
        {
          from,
          value: amount.toHexString(),
          to,
          chainId: '0x4',
        },
      ],
    });
  } catch (error) {
    throw new Error("We could't connect to your wallet.");
  }
}

export const useCreateDonation = (
  donation: Donation,
  after?: {
    onSuccess?: () => void;
    onError?: (e: any) => void;
  }
) => {
  const [isLoading, setisLoading] = useState(false);

  const { mutate: createDonation, error } = useMutation(
    async () => {
      setisLoading(true);
      return newDonation(donation).finally(() => setisLoading(false));
    },
    {
      onError: after?.onError,
      onSuccess: after?.onSuccess,
    }
  );

  return { createDonation, isLoading, error };
};
