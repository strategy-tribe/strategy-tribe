import { Wallet } from '@prisma/client';

export type Donation = {
  from: {
    userId: string;
    wallet: string;
  };
  to: Recipient;
  amountInEth: number;
};

export interface Recipient {
  wallet: Wallet;
}
