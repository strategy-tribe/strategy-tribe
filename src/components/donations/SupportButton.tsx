import { useCreateDonation } from '@/lib/hooks/donationHooks';
import { Donation, Recipient } from '@/lib/models/donation';

import { useAuth } from '@/auth/AuthContext';

import ConnectWalletButton from '../auth/ConnectWalletButton';
import { Button, ButtonStyle } from '../utils/Button';

export function SupportButton({
  amountInEth: amount,
  recipient,
  after,
  disabled,
}: {
  amountInEth: number;
  recipient: Recipient;
  after?: {
    onSuccess: () => void;
    onError: (e: any) => void;
  };
  disabled?: boolean;
}) {
  //*Auth
  const { userId, userInfo } = useAuth();

  if (userId && userInfo) {
    return (
      <ActualSupportButton
        userId={userId}
        userWallet={userInfo.address}
        amountInEth={amount}
        recipient={recipient}
        after={after}
        disabled={disabled}
      />
    );
  } else {
    return <ConnectWalletButton />;
  }
}

function ActualSupportButton({
  amountInEth: amount,
  recipient,
  after,
  userId,
  userWallet,
  disabled,
}: {
  userId: string;
  userWallet: string;
  amountInEth: number;
  recipient: Recipient;
  after?: {
    onSuccess: () => void;
    onError: (e: any) => void;
  };
  disabled?: boolean;
}) {
  //*Donations
  const donation: Donation = {
    to: recipient,
    from: {
      userId: userId,
      wallet: userWallet,
    },
    amountInEth: amount,
  };

  const { createDonation, isLoading } = useCreateDonation(donation, after);

  return (
    <Button
      info={{
        label: isLoading ? 'Waiting for your wallet' : 'Donate',
        style: ButtonStyle.Filled,
        className: 'w-fit',
        onClick: () => {
          createDonation();
        },
        disabled: disabled || isLoading,
      }}
    />
  );
}
